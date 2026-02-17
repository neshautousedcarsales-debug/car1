import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const helpLinks = [
  { label: "Browse our inventory", href: "/inventory", desc: "View all available vehicles with filters and search." },
  { label: "Contact us", href: "/contact", desc: "Send a message, get directions, or call us directly." },
  { label: "FAQ", href: "/faq", desc: "Answers to common questions about financing, test drives, and more." },
  { label: "About us", href: "/about", desc: "Learn about our dealership and what we offer." },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Help</h1>
        <p className="mt-2 text-lg text-white/80">
          Find what you need below, or get in touch and we&apos;ll assist you.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {helpLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition hover:border-[var(--accent)]/50 hover:bg-white/5"
            >
              <h2 className="font-semibold text-white">{item.label}</h2>
              <p className="mt-2 text-sm text-white/70">{item.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-lg font-semibold text-white">Prefer to talk?</h2>
          <p className="mt-2 text-white/80">
            Call us at{" "}
            <a href="tel:+14704030168" className="text-[var(--accent)] hover:underline">
              +1 470-403-0168
            </a>{" "}
            or visit us at 2950 Midway Rd, Decatur, GA 30030.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
