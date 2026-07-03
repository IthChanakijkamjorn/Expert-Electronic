"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function ProductImageLightbox({ imageUrl, productName }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const fullResUrl = imageUrl.includes("cdn.sanity.io")
    ? `${imageUrl}?w=1600&fit=max&auto=format`
    : imageUrl;

  const lightbox = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
      onClick={() => setOpen(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fullResUrl}
        alt={productName}
        style={{
          maxHeight: "90vh",
          maxWidth: "90vw",
          width: "auto",
          height: "auto",
          borderRadius: "12px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Close button */}
      <button
        onClick={() => setOpen(false)}
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "9999px",
          backgroundColor: "rgba(255,255,255,0.2)",
          color: "white",
          fontSize: "1.125rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        ✕
      </button>

      <p
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.3)",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        Click outside or press Esc to close
      </p>
    </div>
  );

  return (
    <>
      {/* Thumbnail */}
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

      {/* Portal lightbox — renders directly into document.body */}
      {mounted && open && createPortal(lightbox, document.body)}
    </>
  );
}
