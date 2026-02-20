import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using Nesh Auto Sales Used Cars website. Vehicle information, pricing, and communications policy.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-white/60">Last updated: {new Date().toLocaleDateString("en-US")}</p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-8 text-white/80">
          <div>
            <h2 className="text-xl font-semibold text-white">Use of This Website</h2>
            <p className="mt-2">
              By using this website, you agree to use it only for lawful purposes and in a way that does not
              infringe the rights of others or restrict their use of the site. Vehicle information is provided
              for general reference; we strive for accuracy but do not guarantee that all details are error-free.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Vehicles and Pricing</h2>
            <p className="mt-2">
              All vehicles are subject to prior sale. Prices and availability may change without notice. Contact
              us to confirm availability and current pricing before visiting.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Inquiries and Communications</h2>
            <p className="mt-2">
              When you submit an inquiry through our website, you consent to be contacted by us via email or
              phone regarding your request. We will not use your information for unrelated marketing without
              your consent.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-2">
              Questions about these Terms & Conditions? Reach us at{" "}
              <a href="mailto:info@automart.com" className="text-[var(--accent)] hover:underline">
                info@automart.com
              </a>{" "}
              or{" "}
              <a href="tel:+14704030168" className="text-[var(--accent)] hover:underline">
                +1 470-403-0168
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
