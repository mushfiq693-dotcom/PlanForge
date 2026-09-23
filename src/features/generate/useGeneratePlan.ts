"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { GeneratePlanRequest } from "./schema";
import { ApiErrorResponse, ApiErrorCode } from "@/types/api";
import { lintPlan, LintResult } from "@/lib/plan-lint";

export type GenerationStatus = "idle" | "loading" | "streaming" | "success" | "error";

export interface UseGeneratePlanReturn {
  status: GenerationStatus;
  plan: string;
  error: string | null;
  errorCode: ApiErrorCode | null;
  lintResult: LintResult | null;
  isGenerating: boolean;
  generate: (payload: GeneratePlanRequest) => Promise<void>;
  stop: () => void;
  reset: () => void;
  setPlan: (plan: string) => void;
}

export function useGeneratePlan(): UseGeneratePlanReturn {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [plan, setPlan] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<ApiErrorCode | null>(null);
  const [lintResult, setLintResult] = useState<LintResult | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus((prev) => (prev === "streaming" || prev === "loading" ? "success" : prev));
  }, []);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus("idle");
    setPlan("");
    setError(null);
    setErrorCode(null);
    setLintResult(null);
  }, []);

  const generate = useCallback(
    async (payload: GeneratePlanRequest) => {
      // Abort any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;
      let isTimedOut = false;

      // Set a 45-second initial connection timeout
      const initialTimeoutId = setTimeout(() => {
        isTimedOut = true;
        controller.abort();
      }, 45000);

      setStatus("loading");
      setPlan("");
      setError(null);
      setErrorCode(null);
      setLintResult(null);

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        // Handle non-200 responses
        if (!response.ok) {
          clearTimeout(initialTimeoutId);
          let errorData: ApiErrorResponse;
          try {
            errorData = await response.json();
          } catch {
            errorData = {
              error: response.status === 504
                ? "Serverless execution timed out on Vercel. Please retry with 'openrouter/free' or check your configuration."
                : `Request failed with status ${response.status}`,
              code: response.status === 504 ? "PROVIDER_UNAVAILABLE" : "INTERNAL_ERROR",
            };
          }

          setError(errorData.error);
          setErrorCode(errorData.code);
          setStatus("error");
          return;
        }

        // Handle streaming response
        if (!response.body) {
          clearTimeout(initialTimeoutId);
          throw new Error("No response body received from server.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let hasStartedStreaming = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          if (chunk) {
            // Once first chunk arrives, cancel initial connection timeout
            if (!hasStartedStreaming) {
              clearTimeout(initialTimeoutId);
              hasStartedStreaming = true;
              setStatus("streaming");
            }

            accumulated += chunk;
            setPlan(accumulated);
          }
        }

        clearTimeout(initialTimeoutId);

        if (!accumulated.trim()) {
          throw new Error("Empty response received from AI model. Please retry.");
        }

        // Run non-blocking deterministic Anti-Slop lint on final assembled text
        const audit = lintPlan(accumulated);
        setLintResult(audit);
        setStatus("success");
      } catch (err: unknown) {
        clearTimeout(initialTimeoutId);

        if (isTimedOut) {
          setError("The AI model took too long to connect. Free tier models may experience temporary queue delays. Please retry.");
          setErrorCode("PROVIDER_UNAVAILABLE");
          setStatus("error");
          return;
        }

        if (controller.signal.aborted || (err instanceof Error && err.name === "AbortError")) {
          // Stopped intentionally by user
          setStatus((prev) => (prev === "streaming" || prev === "loading" ? "success" : prev));
          return;
        }

        const message = err instanceof Error ? err.message : "Failed to generate plan. Please try again.";
        setError(message);
        setErrorCode("INTERNAL_ERROR");
        setStatus("error");
      } finally {
        clearTimeout(initialTimeoutId);
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      }
    },
    []
  );

  return {
    status,
    plan,
    error,
    errorCode,
    lintResult,
    isGenerating: status === "loading" || status === "streaming",
    generate,
    stop,
    reset,
    setPlan,
  };
}
