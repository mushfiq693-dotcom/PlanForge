"use client";

import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const viewerEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll gently when streaming actively
  useEffect(() => {
    if (isStreaming && viewerEndRef.current) {
      viewerEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [content, isStreaming]);

  if (mode === "raw") {
    return (
      <div className="relative flex-1 overflow-auto rounded-[6px] border border-border bg-canvas p-4 font-mono text-xs text-text leading-relaxed selection:bg-primary/30">
        <pre className="whitespace-pre-wrap font-mono break-words">
          {content}
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-primary animate-caret align-middle ml-1" />
          )}
        </pre>
        <div ref={viewerEndRef} />
      </div>
    );
  }

  return (
    <div className="relative flex-1 overflow-auto rounded-[6px] border border-border bg-canvas p-4 sm:p-6 font-sans text-sm text-text leading-relaxed selection:bg-primary/30">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-xl font-bold font-mono text-primary border-b border-border pb-2.5 mt-2 mb-4 tracking-tight flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-normal border border-primary/20">
                  SPEC
                </span>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-base font-semibold font-mono text-text mt-6 mb-3 border-b border-border-subtle pb-1.5 tracking-tight">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-sm font-semibold font-mono text-text-muted mt-4 mb-2 tracking-normal">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-sm text-text/90 leading-relaxed mb-3.5 font-sans">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-5 my-2.5 space-y-1 text-sm text-text/90">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5 my-2.5 space-y-1 text-sm text-text/90">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-primary bg-primary-subtle px-3.5 py-2 my-3.5 rounded-r-[4px] text-xs font-mono text-text-muted">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="border-border my-6" />,
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code
                    className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs text-primary border border-border-subtle"
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
              <pre className="overflow-x-auto rounded-[6px] border border-border bg-surface p-3.5 my-3.5 font-mono text-xs text-text leading-snug">
                {children}
              </pre>
            ),
            table: ({ children }) => (
              <div className="my-4 overflow-x-auto rounded-[6px] border border-border">
                <table className="w-full text-left text-xs border-collapse">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-surface border-b border-border font-mono text-text-muted">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-border-subtle bg-canvas">
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
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary mt-2">
            <span className="inline-block w-2 h-4 bg-primary animate-caret align-middle" />
            <span className="opacity-75">Streaming execution plan...</span>
          </span>
        )}
      </div>
      <div ref={viewerEndRef} />
    </div>
  );
}
