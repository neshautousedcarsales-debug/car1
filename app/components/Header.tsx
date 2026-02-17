"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const PHONE = "+1 470-403-0168";
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@automart.com";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="border-b border-[var(--border)] bg-[var(--card)]/80 px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center text-sm text-white/90 sm:justify-end sm:text-right">
          <a href={`mailto:${EMAIL}`} className="hover:text-white transition">
            {EMAIL}
          </a>
          <a href="tel:+14704030168" className="hover:text-white transition">
            {PHONE}
          </a>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Nesh Auto Sales Used Cars"
              width={200}
              height={68}
              className="h-12 w-auto object-contain sm:h-14"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/90 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-white/90 hover:text-white transition touch-manipulation"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden overflow-hidden transition-[height] duration-300 ease-out ${
            mobileMenuOpen ? "h-auto" : "h-0"
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <nav className="border-t border-[var(--border)] bg-[var(--background)] px-4 py-4 sm:px-6">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-white transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 border-t border-[var(--border)] pt-4">
              <a
                href={`mailto:${EMAIL}`}
                className="block rounded-lg px-4 py-2 text-sm text-white/80 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {EMAIL}
              </a>
              <a
                href="tel:+14704030168"
                className="block rounded-lg px-4 py-2 text-sm text-white/80 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {PHONE}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
