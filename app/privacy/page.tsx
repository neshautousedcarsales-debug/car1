import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/60">Last updated: {new Date().toLocaleDateString("en-US")}</p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-8 text-white/80">
          <div>
            <h2 className="text-xl font-semibold text-white">Information We Collect</h2>
            <p className="mt-2">
              When you contact us through our website, we collect the information you provide, such as your name,
              email address, phone number, and message content. We use this information to respond to your
              inquiries and to improve our services.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">How We Use Your Information</h2>
            <p className="mt-2">
              We use the information you provide solely to communicate with you about vehicles, schedule test
              drives, and respond to your questions. We do not sell or share your personal information with
              third parties for marketing purposes.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Cookies and Analytics</h2>
            <p className="mt-2">
              Our website may use cookies or similar technologies to improve your experience. You can adjust
              your browser settings to manage or disable cookies.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Contact Us</h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy or your personal data, please contact us at{" "}
              <a href="mailto:info@automart.com" className="text-[var(--accent)] hover:underline">
                info@automart.com
              </a>{" "}
              or call{" "}
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
