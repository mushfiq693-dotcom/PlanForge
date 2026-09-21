"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PlanForgeLogo } from "@/components/PlanForgeLogo";

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-surface/30 backdrop-blur-md border-b border-white/5 py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group inline-flex items-center">
          <PlanForgeLogo markSize={36} badgeText="v1.0" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-text-muted font-sans">
          <a
            href="#features"
            className="hover:text-text transition-colors hover:scale-105 transform"
          >
            Features
          </a>
          <a
            href="#blueprint"
            className="hover:text-text transition-colors hover:scale-105 transform"
          >
            13-Section Template
          </a>
          <a
            href="#how-it-works"
            className="hover:text-text transition-colors hover:scale-105 transform"
          >
            How it Works
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-text-muted hover:text-text focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-surface/95 backdrop-blur-2xl px-6 py-4 flex flex-col gap-4">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-text-muted hover:text-text py-1"
          >
            Features
          </a>
          <a
            href="#blueprint"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-text-muted hover:text-text py-1"
          >
            13-Section Template
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-text-muted hover:text-text py-1"
          >
            How it Works
          </a>
        </div>
      )}
    </header>
  );
}
