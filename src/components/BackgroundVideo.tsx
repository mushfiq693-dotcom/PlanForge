"use client";

import React, { useEffect, useRef, useState } from "react";

export function BackgroundVideo() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  // Track which video is currently visible / primary
  const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB) return;

    // Ensure muted for all browsers (especially Safari/iOS policies)
    vA.defaultMuted = true;
    vA.muted = true;
    vB.defaultMuted = true;
    vB.muted = true;

    // Start Video A initially
    vA.play().catch(() => {});

    const CROSSFADE_TIME = 1.5; // Seconds before video end to trigger crossfade
    const START_OFFSET = 0.2; // Skip possible static/blank 0.0s start frame

    const interval = setInterval(() => {
      const current = activeVideo === "A" ? vA : vB;
      const next = activeVideo === "A" ? vB : vA;

      if (!current || !next || !current.duration || isNaN(current.duration)) return;

      const timeLeft = current.duration - current.currentTime;

      // When approaching the end of current video, seamlessly spin up the next video and crossfade
      if (timeLeft <= CROSSFADE_TIME && !isTransitioningRef.current) {
        isTransitioningRef.current = true;

        next.currentTime = START_OFFSET;
        next.play().then(() => {
          // Switch active video to fade in next and fade out current
          setActiveVideo((prev) => (prev === "A" ? "B" : "A"));

          // Once crossfade duration completes, pause the previous video
          setTimeout(() => {
            current.pause();
            isTransitioningRef.current = false;
          }, CROSSFADE_TIME * 1000);
        }).catch(() => {
          isTransitioningRef.current = false;
        });
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [activeVideo]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-canvas"
      aria-hidden="true"
    >
      {/* Video Layer A */}
      <video
        ref={videoARef}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover object-center filter contrast-[1.08] saturate-[1.05] transition-opacity duration-1000 ease-in-out ${
          activeVideo === "A" ? "opacity-85" : "opacity-0"
        }`}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Video Layer B (Crossfade Seamless Buffer) */}
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover object-center filter contrast-[1.08] saturate-[1.05] transition-opacity duration-1000 ease-in-out ${
          activeVideo === "B" ? "opacity-85" : "opacity-0"
        }`}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Subtle modern dark overlay to ensure high UI readability and contrast */}
      <div className="absolute inset-0 bg-canvas/45 backdrop-blur-[0.5px] bg-gradient-to-b from-canvas/30 via-canvas/45 to-canvas/70" />
    </div>
  );
}
