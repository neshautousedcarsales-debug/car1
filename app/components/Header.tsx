"use client";

import { Button } from "@heroui/react";
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
        <Link href="/" className="flex items-center gap-0.5 text-xl font-semibold">
          <span className="text-white">Auto</span>
          <span className="text-[var(--accent)]">Mart</span>
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

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
          
          </div>
         
          <button type="button" className="md:hidden p-2 text-white/90" aria-label="Menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
    </>
  );
}
