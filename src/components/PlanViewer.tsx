"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowDown } from "lucide-react";

interface PlanViewerProps {
  content: string;
  isStreaming?: boolean;
  mode?: "preview" | "raw";
}

export function PlanViewer({
  content,
  isStreaming = false,
  mode = "preview",
}: PlanViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  // Monitor user scroll to pause auto-scroll if they want to read earlier sections
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // If user is more than 100px from the bottom, consider them scrolling up
    if (distanceFromBottom > 100) {
      setUserScrolledUp(true);
    } else {
      setUserScrolledUp(false);
    }
  }, []);

  // Jump to bottom helper
  const scrollToBottom = useCallback((instant = false) => {
    if (containerRef.current) {
      if (instant) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      } else {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
      setUserScrolledUp(false);
    }
  }, []);

  // Instant container-only auto-scroll during streaming (no window jitter, no animation conflicts)
  useEffect(() => {
    if (isStreaming && !userScrolledUp && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [content, isStreaming, userScrolledUp]);

  // When a new generation starts, reset userScrolledUp and scroll to bottom
  useEffect(() => {
    if (isStreaming) {
      setUserScrolledUp(false);
    }
  }, [isStreaming]);

  if (mode === "raw") {
    return (
      <div className="relative flex-1 min-h-0 flex flex-col">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-auto rounded-[8px] border border-white/10 bg-black/50 p-4 font-mono text-xs text-zinc-200 leading-relaxed selection:bg-primary/30"
        >
          <pre className="whitespace-pre-wrap font-mono break-words">
            {content}
            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-primary animate-caret align-middle ml-1" />
            )}
          </pre>
        </div>

        {/* Floating jump to latest pill when user scrolled up during stream */}
        {isStreaming && userScrolledUp && (
          <button
            onClick={() => scrollToBottom(true)}
            className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-primary shadow-lg hover:bg-surface hover:border-primary transition-all cursor-pointer animate-fadeIn"
          >
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            <span>Scroll to latest</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden rounded-[8px] border border-white/10 bg-black/40 backdrop-blur-md p-4 sm:p-6 font-sans text-sm text-text leading-relaxed selection:bg-primary/30"
      >
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-lg sm:text-xl font-bold font-mono text-primary border-b border-white/10 pb-2.5 mt-2 mb-4 tracking-tight flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono font-normal border border-primary/20">
                    BLUEPRINT
                  </span>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-sm sm:text-base font-semibold font-mono text-text mt-6 mb-3 border-b border-white/5 pb-1.5 tracking-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xs sm:text-sm font-semibold font-mono text-primary/90 mt-4 mb-2 tracking-normal">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-xs sm:text-sm text-text/90 leading-relaxed mb-3.5 font-sans">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-5 my-2.5 space-y-1 text-xs sm:text-sm text-text/90">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 my-2.5 space-y-1 text-xs sm:text-sm text-text/90">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-primary bg-primary/10 px-3.5 py-2 my-3.5 rounded-r-[6px] text-xs font-mono text-text-muted">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="border-white/10 my-6" />,
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code
                      className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-teal-300 border border-white/10"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="overflow-x-auto rounded-[8px] border border-white/10 bg-black/60 p-4 my-3.5 font-mono text-xs text-zinc-200 leading-snug">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="my-4 overflow-x-auto rounded-[8px] border border-white/10">
                  <table className="w-full text-left text-xs border-collapse">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-white/[0.03] border-b border-white/10 font-mono text-text-muted">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => (
                <tbody className="divide-y divide-white/5 bg-transparent">
                  {children}
                </tbody>
              ),
              th: ({ children }) => (
                <th className="p-2.5 font-medium">{children}</th>
              ),
              td: ({ children }) => (
                <td className="p-2.5 text-text/85">{children}</td>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline underline-offset-2"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>

          {isStreaming && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary mt-3">
              <span className="inline-block w-2 h-4 bg-primary animate-caret align-middle" />
              <span className="opacity-75">Streaming execution blueprint...</span>
            </span>
          )}
        </div>
      </div>

      {/* Floating jump to latest pill when user scrolled up during stream */}
      {isStreaming && userScrolledUp && (
        <button
          onClick={() => scrollToBottom(true)}
          className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-primary shadow-lg hover:bg-surface hover:border-primary transition-all cursor-pointer animate-fadeIn"
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          <span>Scroll to latest</span>
        </button>
      )}
    </div>
  );
}
