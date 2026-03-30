"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getBasePath } from "@/lib/utils";

const HERO_VIDEOS = [
  { webm: "/videos/video1.webm", mp4: "/videos/video1.mp4" },
  { webm: "/videos/video2.webm", mp4: "/videos/video2.mp4" },
  { webm: "/videos/video3.webm", mp4: "/videos/video3.mp4" },
  { webm: "/videos/video4.webm", mp4: "/videos/video4.mp4" },
  { webm: "/videos/video5.webm", mp4: "/videos/video5.mp4" },
];

export function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const basePath = getBasePath();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const playNext = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
      setFading(false);
    }, 600);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [currentIndex]);

  const current = HERO_VIDEOS[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        muted
        playsInline
        onEnded={playNext}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        <source src={`${basePath}${current.webm}`} type="video/webm" />
        <source src={`${basePath}${current.mp4}`} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-rural-black/85 via-rural-black/75 to-rural-black/90" />

      {/* Top and bottom fade */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-rural-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-rural-black to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-5 sm:px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-rural-gold/10 blur-xl" />
            <img
              src={`${basePath}/images/rural-logo.png`}
              alt="Rural Cocina Artesanal"
              width={140}
              height={140}
              className="relative rounded-full border-2 border-rural-gold/30 shadow-2xl"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-5 tracking-tight leading-[1.1]">
          Rural{" "}
          <span className="text-rural-gold">Cocina</span>{" "}
          Artesanal
        </h1>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-7">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-rural-gold/50" />
          <div className="w-2 h-2 rounded-full bg-rural-gold/70" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-rural-gold/50" />
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-white/70 max-w-xl mx-auto mb-12 leading-relaxed font-light">
          {t("subtitle")}
        </p>

        {/* CTA */}
        <a
          href="#carta"
          className="group inline-flex items-center gap-3 px-9 py-4 bg-rural-gold hover:bg-rural-gold-light text-rural-black font-bold rounded-full transition-all shadow-xl shadow-rural-gold/15 text-base sm:text-lg"
        >
          {t("cta")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 group-hover:translate-y-0.5 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
