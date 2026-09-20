export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text">
      {/* Blueprint Header */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-primary text-canvas font-mono font-bold text-sm">
              PF
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-text">
                PlanForge
              </h1>
              <p className="text-xs text-text-muted font-mono">
                v1.0 // Idea → IMPLEMENTATION_PLAN.md
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-mono text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Engine Ready
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace (Two-pane desktop, stacked mobile) */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:items-stretch">
        {/* Left Column (Input & Options) */}
        <section className="flex flex-1 flex-col rounded-[10px] border border-border bg-surface p-5 lg:max-w-xl">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Input Specification
            </h2>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center text-center p-6 text-text-muted">
            <p className="text-sm">Idea input panel placeholder</p>
          </div>
        </section>

        {/* Right Column (Plan Preview & Actions) */}
        <section className="flex flex-1 flex-col rounded-[10px] border border-border bg-surface p-5 min-h-[400px]">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Generated Plan Output
            </h2>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center text-center p-6 text-text-muted">
            <p className="text-sm">Plan preview panel placeholder</p>
          </div>
        </section>
      </main>

      {/* Blueprint Footer */}
      <footer className="border-t border-border bg-surface/50 py-3 px-4 text-center text-xs font-mono text-text-muted">
        Crafted for AI Agent Workflows &bull; Cursor &bull; Claude Code
      </footer>
    </div>
  );
}
