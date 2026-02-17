"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button, Input } from "@heroui/react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("Thank you! Your message has been sent.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Failed to send. Please try again or call (470) 403-0168.");
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Contact Us</h1>
        <p className="mt-2 text-white/80">
          Have a question or want to schedule a test drive? Get in touch.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="text-lg font-semibold text-white">Phone</h2>
              <a href="tel:4704030168" className="mt-2 block text-[var(--accent)] hover:underline">
                (470) 403-0168
              </a>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="text-lg font-semibold text-white">Nesh Auto Sales Used Cars</h2>
              <p className="mt-2 text-white/80">
                We&apos;re here to help you find the right vehicle. Send us a message and we&apos;ll
                get back to you as soon as possible.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="text-lg font-semibold text-white">Location</h2>
              <a
                href="https://www.google.com/maps/search/?api=1&query=2950+Midway+Rd,+Decatur,+GA+30030"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-[var(--accent)] hover:underline"
              >
                2950 Midway Rd, Decatur, GA 30030, United States
              </a>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-[var(--card)]">
              <iframe
                title="Map - 2950 Midway Rd, Decatur, GA 30030"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-84.265%2C33.695%2C-84.252%2C33.705&layer=mapnik&marker=33.6999%2C-84.2585"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white">Send a message</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                name="name"
                placeholder="Your Name"
                required
                className="bg-white/5 text-white placeholder:text-white/50"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="bg-white/5 text-white placeholder:text-white/50"
              />
              <Input
                name="phone"
                type="tel"
                placeholder="Phone"
                className="bg-white/5 text-white placeholder:text-white/50"
              />
              <Input
                name="subject"
                placeholder="Subject (e.g. Question about a vehicle)"
                className="bg-white/5 text-white placeholder:text-white/50"
              />
              <textarea
                name="message"
                placeholder="Your message"
                rows={4}
                required
                className="w-full rounded-lg border border-[var(--border)] bg-white/5 px-3 py-2 text-white placeholder:text-white/50"
              />
              {message && (
                <p
                  className={`text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}
                >
                  {message}
                </p>
              )}
              <Button
                type="submit"
                isDisabled={status === "sending"}
                className="w-full bg-[var(--accent)] text-white disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
