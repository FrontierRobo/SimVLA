"use client";

import { useCallback, useState } from "react";

export function CopyToClipboard({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copyText = useCallback(async () => {
    // Preferred modern API (works on https + localhost).
    try {
      if (navigator?.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fall through to legacy copy
    }

    // Fallback for non-secure contexts (e.g. http://<ip>) and older browsers.
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      textarea.style.left = "-9999px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }, [text]);

  const onCopy = useCallback(async () => {
    const ok = await copyText();
    if (ok) {
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1200);
    } else {
      setStatus("failed");
      window.setTimeout(() => setStatus("idle"), 2000);
    }
  }, [copyText]);

  const label =
    status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy";

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
      aria-live="polite"
      title="Copy to clipboard"
    >
      {label}
    </button>
  );
}

