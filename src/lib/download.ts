/**
 * Utilities for downloading and copying generated implementation plans.
 */

/**
 * Sanitizes a project name for use in the downloaded filename.
 * Fallback to IMPLEMENTATION_PLAN.md if empty.
 */
export function sanitizeFilename(projectName?: string | null): string {
  if (!projectName || typeof projectName !== "string" || !projectName.trim()) {
    return "IMPLEMENTATION_PLAN.md";
  }

  const clean = projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!clean) {
    return "IMPLEMENTATION_PLAN.md";
  }

  return `${clean.toUpperCase()}_IMPLEMENTATION_PLAN.md`;
}

/**
 * Initiates a client-side download of Markdown content.
 */
export function downloadMarkdownFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Copies plain text to clipboard safely.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}
