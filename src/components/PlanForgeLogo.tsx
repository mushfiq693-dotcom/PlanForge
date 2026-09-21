"use client";

import React from "react";

interface PlanForgeLogoMarkProps {
  className?: string;
  size?: number;
}

export function PlanForgeLogoMark({
  className = "h-8 w-8",
  size = 36,
}: PlanForgeLogoMarkProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(63,182,168,0.35)] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient
            id="pf-badge-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1E2632" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0E1217" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient
            id="pf-top-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#84F0E2" />
            <stop offset="100%" stopColor="#3FB6A8" />
          </linearGradient>

          <linearGradient
            id="pf-left-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3FB6A8" />
            <stop offset="100%" stopColor="#1E6E64" />
          </linearGradient>

          <linearGradient
            id="pf-right-grad"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#5BE2D3" />
            <stop offset="100%" stopColor="#25897E" />
          </linearGradient>

          <filter id="pf-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="2.5"
              floodColor="#3FB6A8"
              floodOpacity="0.45"
            />
          </filter>
        </defs>

        {/* Outer Premium Squircle Badge with Frosted Border */}
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="10"
          fill="url(#pf-badge-grad)"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.2"
        />

        {/* Blueprint Geometric Lines Background Grid */}
        <path
          d="M20 4V36M4 20H36"
          stroke="rgba(63, 182, 168, 0.08)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* Isometric Top Blueprint Facet (Apex Diamond) */}
        <path
          d="M20 7.5L31 13.8L20 20.2L9 13.8L20 7.5Z"
          fill="url(#pf-top-grad)"
          filter="url(#pf-glow)"
        />

        {/* Left Pillar (The Architectural 'P' Backbone) */}
        <path
          d="M9.5 15.8L18.5 21V32.5L9.5 27.2V15.8Z"
          fill="url(#pf-left-grad)"
        />

        {/* Right Stepped Forge Wings (The Precision 'F' Slices) */}
        <path
          d="M21.5 21L30.5 15.8V20L24.5 23.5L30.5 27V31.2L21.5 26V21Z"
          fill="url(#pf-right-grad)"
        />

        {/* Subtle Central Architectural Node / Nexus Spark */}
        <circle cx="20" cy="20.2" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

interface PlanForgeLogoProps {
  className?: string;
  markSize?: number;
  showBadge?: boolean;
  badgeText?: string;
}

export function PlanForgeLogo({
  className = "",
  markSize = 36,
  showBadge = true,
  badgeText = "v1.0",
}: PlanForgeLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <PlanForgeLogoMark size={markSize} />
      <div className="flex items-center gap-2">
        <span className="text-base font-bold tracking-tight text-white font-sans transition-colors group-hover:text-primary">
          Plan<span className="text-primary font-semibold">Forge</span>
        </span>
        {showBadge && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-text-muted font-sans font-medium tracking-wide">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
