"use client";

import { useState } from "react";
import Image from "next/image";

export default function SolutionsGallery({ projects }) {
  const [lightbox, setLightbox] = useState(null);
  // lightbox = { images: [], index: 0 }

  function openLightbox(images, index) {
    setLightbox({ images, index });
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = "";
  }

  function prev() {
    setLightbox((lb) => ({ ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length }));
  }

  function next() {
    setLightbox((lb) => ({ ...lb, index: (lb.index + 1) % lb.images.length }));
  }

  // Group by year descending
  const byYear = {};
  projects.forEach((p) => {
    const y = p.year ?? "Unknown";
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(p);
  });
  const years = Object.keys(byYear).sort((a, b) => b - a);

  return (
    <>
      {years.map((year) => (
        <section key={year} className="mb-20">
          {/* Year heading */}
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-3xl font-bold text-[#00004d]">{year}</h2>
            <div className="h-px flex-1 bg-[#00004d]/10" />
          </div>

          {/* Project cards — 2 per row */}
          <div className="grid gap-8 sm:grid-cols-2">
            {byYear[year].map((project, pi) => (
              <div
                key={project._id}
                className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
                style={{ animationDelay: `${pi * 80}ms` }}
              >
                {/* Title + location */}
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/50">
                  {project.location ?? ""}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-[#0c0c2a]">{project.title}</h3>

                {/* Image grid */}
                {project.images && project.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {project.images.slice(0, 4).map((img, i) => {
                      const isMore = i === 3 && project.images.length > 4;
                      return (
                        <button
                          key={img._key ?? i}
                          onClick={() => openLightbox(project.images, i)}
                          className="group relative overflow-hidden rounded-2xl bg-[#00004d]/5 aspect-[4/3] w-full"
                        >
                          <Image
                            src={img.url}
                            alt={img.caption ?? project.title}
                            fill
                            className="object-cover transition group-hover:scale-105"
                          />
                          {isMore && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#00004d]/50">
                              <span className="text-lg font-bold text-white">+{project.images.length - 3}</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative mx-4 w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-semibold uppercase tracking-widest"
            >
              Close ✕
            </button>

            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-black">
              <Image
                src={lightbox.images[lightbox.index].url}
                alt={lightbox.images[lightbox.index].caption ?? "Project image"}
                fill
                className="object-contain"
              />
            </div>

            {/* Caption */}
            {lightbox.images[lightbox.index].caption && (
              <p className="mt-3 text-center text-sm text-white/70">
                {lightbox.images[lightbox.index].caption}
              </p>
            )}

            {/* Prev / Next */}
            {lightbox.images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-x-14 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition"
                >
                  &#8592;
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 translate-x-14 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition"
                >
                  &#8594;
                </button>
              </>
            )}

            {/* Dots */}
            {lightbox.images.length > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {lightbox.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox((lb) => ({ ...lb, index: i }))}
                    className={`h-2 w-2 rounded-full transition ${
                      i === lightbox.index ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
