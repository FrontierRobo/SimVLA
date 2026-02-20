"use client";

import { useState, useEffect, useCallback } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Figure({
  src,
  alt,
  width,
  height,
  caption,
  priority,
  maxWidthPx = 600,
  align = "center",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
  maxWidthPx?: number;
  align?: "center" | "left";
}) {
  const fullSrc = `${BASE}${src}`;
  const [isOpen, setIsOpen] = useState(false);

  const closeLightbox = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeLightbox]);

  return (
    <>
      <figure
        className={`${
          align === "center" ? "mx-auto" : ""
        } w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm`}
        style={{ maxWidth: maxWidthPx }}
      >
        <div className="overflow-hidden rounded-xl bg-slate-50">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="View full size image"
            className="block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            title="Click to view full size"
          >
            <img
              src={fullSrc}
              alt={alt}
              width={width}
              height={height}
              loading={priority ? "eager" : "lazy"}
              className="h-auto w-full"
            />
          </button>
        </div>
        {caption ? (
          <figcaption className="mt-2 text-xs leading-relaxed text-slate-600">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            aria-label="Close preview"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            className="relative h-full w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative max-h-full max-w-full overflow-hidden"
              onClick={closeLightbox}
            >
              <img
                src={fullSrc}
                alt={alt}
                width={width}
                height={height}
                className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain shadow-2xl rounded-md cursor-zoom-out"
              />
            </div>
          </div>

          {caption && (
            <div className="absolute bottom-6 left-0 right-0 text-center px-4 pointer-events-none">
              <p className="inline-block bg-black/50 px-3 py-1.5 rounded-full text-sm text-white/90 backdrop-blur-md">
                {caption}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
