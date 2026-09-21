import React from "react";
import { AlertTriangle, RefreshCw, KeyRound, Clock, ShieldAlert } from "lucide-react";
import { ApiErrorCode } from "@/types/api";

interface ErrorStateProps {
  error: string;
  code?: ApiErrorCode | null;
  onRetry?: () => void;
}

export function ErrorState({ error, code, onRetry }: ErrorStateProps) {
  const getErrorGuidance = () => {
    switch (code) {
      case "RATE_LIMITED":
        return {
          icon: <Clock className="h-6 w-6 text-warning" />,
          title: "Rate Limit Exceeded",
          description: "You have submitted too many requests in a short time window. Please wait a few moments before trying again.",
          borderClass: "border-warning/40",
          bgClass: "bg-warning-subtle",
        };
      case "UNAUTHORIZED":
      case "SERVER_CONFIG_ERROR":
        return {
          icon: <KeyRound className="h-6 w-6 text-danger" />,
          title: "Configuration Error",
          description: "The server is missing or has an invalid OPENROUTER_API_KEY. Please verify your .env.local file.",
          borderClass: "border-danger/40",
          bgClass: "bg-danger-subtle",
        };
      case "INSUFFICIENT_CREDITS":
        return {
          icon: <ShieldAlert className="h-6 w-6 text-danger" />,
          title: "Insufficient Credits",
          description: "The OpenRouter account balance is empty. Please top up credits to resume generating plans.",
          borderClass: "border-danger/40",
          bgClass: "bg-danger-subtle",
        };
      case "PROVIDER_UNAVAILABLE":
        return {
          icon: <AlertTriangle className="h-6 w-6 text-warning" />,
          title: "AI Provider Unavailable",
          description: "OpenRouter or the selected model provider is currently experiencing downtime or overload. Please try again shortly.",
          borderClass: "border-warning/40",
          bgClass: "bg-warning-subtle",
        };
      default:
        return {
          icon: <AlertTriangle className="h-6 w-6 text-danger" />,
          title: "Generation Failed",
          description: error || "An unexpected error occurred while generating the implementation plan.",
          borderClass: "border-danger/40",
          bgClass: "bg-danger-subtle",
        };
    }
  };

  const guidance = getErrorGuidance();

  return (
    <div
      role="alert"
      className={`flex flex-1 flex-col items-center justify-center rounded-[6px] border ${guidance.borderClass} ${guidance.bgClass} p-8 text-center min-h-[380px] font-sans`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-border bg-surface mb-4 shadow-sm">
        {guidance.icon}
      </div>

      <h3 className="text-base font-semibold font-mono text-text mb-2">
        {guidance.title}
      </h3>

      <p className="max-w-md text-xs text-text-muted mb-6 leading-relaxed">
        {guidance.description}
      </p>

      {error && error !== guidance.description && (
        <div className="w-full max-w-md rounded-[6px] border border-border bg-canvas/60 p-3 mb-6 font-mono text-xs text-text-muted break-words text-left">
          <span className="text-danger font-semibold">Error Detail:</span> {error}
        </div>
      )}

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-[6px] bg-primary px-4 py-2 text-xs font-semibold font-mono text-canvas hover:bg-primary-hover active:bg-primary-hover transition-colors shadow-sm"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry Generation
        </button>
      )}
    </div>
  );
}
