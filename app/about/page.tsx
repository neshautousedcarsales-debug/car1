import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const stats = [
  { value: "150+", label: "Total Brands" },
  { value: "40", label: "Locations" },
  { value: "38", label: "Happy Customers" },
  { value: "5", label: "Awards" },
];

const services = [
  { title: "Buy or Sell", icon: "car", desc: "Find your perfect car or sell your current one with ease." },
  { title: "Maintenance", icon: "wrench", desc: "Full service and maintenance for all makes and models." },
  { title: "Finance", icon: "document", desc: "Flexible financing options to fit your budget." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">About Nesh Auto Used Cars</h1>
        <p className="mt-4 max-w-3xl text-lg text-white/80">
          Welcome to Nesh Auto Used Cars! We understand that finding the perfect combination of
          quality and affordability can be difficult. Our goal is to provide you and the surrounding
          areas with the best buying experience possible.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white">Our Story</h2>
            <p className="mt-4 text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-bold text-white">{s.value}</p>
                  <p className="text-sm text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"
              alt="Quality used cars"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white">Our Services</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border-2 border-[var(--accent)]/50 bg-[var(--card)] p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
                {s.icon === "car" && "🚗"}
                {s.icon === "wrench" && "🔧"}
                {s.icon === "document" && "📄"}
              </div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
          <h2 className="text-2xl font-semibold text-white">Ready to find your next car?</h2>
          <p className="mt-2 text-white/80">Browse our inventory or get in touch.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/inventory"
              className="rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              View Inventory
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-[var(--border)] bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
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
