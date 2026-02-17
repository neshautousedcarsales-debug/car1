import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Careers</h1>
        <p className="mt-2 text-lg text-white/80">
          Join our team. We&apos;re always looking for motivated people who love cars and customer service.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">Open Positions</h2>
          <p className="mt-2 text-white/80">
            We don&apos;t have any listed openings at the moment, but we welcome resumes and applications.
            If you&apos;re interested in sales, service, or administrative roles, we&apos;d like to hear from you.
          </p>
          <p className="mt-4 text-white/80">
            Send your resume to{" "}
            <a href="mailto:info@automart.com" className="text-[var(--accent)] hover:underline">
              info@automart.com
            </a>{" "}
            with the subject line &quot;Career inquiry,&quot; or stop by our location at 2950 Midway Rd, Decatur, GA 30030.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
