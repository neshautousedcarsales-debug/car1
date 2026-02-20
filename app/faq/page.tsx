import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Nesh Auto Sales Used Cars — financing, test drives, trade-ins, location, and more. Decatur, GA.",
  openGraph: { title: "FAQ", description: "Common questions about buying used cars at Nesh Auto Sales Used Cars." },
};

const faqs = [
  {
    q: "Do you offer financing?",
    a: "Yes, we work with multiple lenders to help you find financing that fits your budget. Contact us or visit our location to discuss your options.",
  },
  {
    q: "Can I schedule a test drive?",
    a: "Absolutely. Use the inquiry form on any vehicle listing or call us at +1 470-403-0168 to schedule a test drive at your convenience.",
  },
  {
    q: "What is your return policy?",
    a: "We encourage you to inspect and test drive any vehicle before purchase. Specific return or exchange terms depend on the sale; we can discuss this when you visit.",
  },
  {
    q: "Where are you located?",
    a: "We are located at 2950 Midway Rd, Decatur, GA 30030, United States. See our Contact page for a map and directions.",
  },
  {
    q: "Do you accept trade-ins?",
    a: "Yes, we accept trade-ins. Bring your current vehicle when you visit and we can provide an appraisal.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-2 text-lg text-white/80">
          Quick answers to common questions. Need more help?{" "}
          <a href="/contact" className="text-[var(--accent)] hover:underline">
            Contact us
          </a>
          .
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <ul className="space-y-6">
          {faqs.map((faq, i) => (
            <li
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
            >
              <h2 className="text-lg font-semibold text-white">{faq.q}</h2>
              <p className="mt-2 text-white/80">{faq.a}</p>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </div>
  );
}
