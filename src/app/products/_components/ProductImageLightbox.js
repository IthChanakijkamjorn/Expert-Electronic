"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductImageLightbox({ imageUrl, productName }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Thumbnail — clickable */}
      <button
        onClick={() => setOpen(true)}
        className="group relative h-96 w-full overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_rgba(0,0,77,0.12)] cursor-zoom-in focus:outline-none"
        aria-label="View full image"
      >
        <Image
          src={imageUrl}
          alt={productName}
          fill
          className="object-contain p-8 transition duration-300 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-[#00004d]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white opacity-0 transition group-hover:opacity-100">
          Click to enlarge
        </span>
      </button>

      {/* Lightbox overlay — truly full screen */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
          onClick={() => setOpen(false)}
        >
          {/* Image fills as much of the screen as possible */}
          <div className="relative h-screen w-screen">
            <Image
              src={imageUrl}
              alt={productName}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white text-lg transition hover:bg-white/40"
            aria-label="Close"
          >
            ✕
          </button>

          {/* ESC hint */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/40">
            Click anywhere or press Esc to close
          </p>
        </div>
      )}
    </>
  );
}
