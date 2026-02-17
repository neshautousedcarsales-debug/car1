"use client";

import { useEffect, useState, useCallback } from "react";
import { Button, Input, Tabs } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import CarBrandsSection from "./components/slider";
import carsData from "../cars.json";

const heroImages = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600",
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600",
];

const stats = [
  { value: "150", label: "Total Brands" },
  { value: "40", label: "Locations" },
  { value: "38", label: "Happy Customers" },
  { value: "5", label: "Awards" },
];

const services = [
  { title: "Buy", icon: "car", desc: "Find your perfect car or sell your current one with ease." },
  { title: "Maintenance", icon: "wrench", desc: "Full service and maintenance for all makes and models." },
  { title: "Finance", icon: "document", desc: "Flexible financing options to fit your budget." },
];

const testimonials = [
  
  {
    name: "Emma Wilton",
    role: "CEO",
    text: "Exceptional service and a wide selection of quality vehicles. The team made the entire process smooth and stress-free.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  },
  {
    name: "Miguel Fernandez",
    role: "Car Enthusiast",
    text: "I'm delighted with my purchase! The staff was knowledgeable and helped me find the perfect ride within my budget.",
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100"
  },
  {
    name: "Sophia Lam",
    role: "First-Time Buyer",
    text: "Buying my first car was much easier than I expected. The team patiently answered all my questions. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1519340333755-c13e1babc5ac?w=100"
  },
  {
    name: "David Kim",
    role: "Repeat Customer",
    text: "This is the second car I've purchased here. Consistently great experience with quality vehicles and honest pricing.",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100"
  },
  {
    name: "Natalie Chen",
    role: "Family Driver",
    text: "Lots of family-friendly options. We found a safe, reliable minivan that was just right for us.",
    avatar: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=100"
  }
];

const brands = ["Tesla", "Audi", "Fiat", "Hyundai", "Peugeot", "Volvo"];

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [isTransitioning]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, goTo]);

  const prev = () => goTo(current > 0 ? current - 1 : heroImages.length - 1);
  const next = () => goTo((current + 1) % heroImages.length);

  return (
    <section className="relative min-h-[60vh] md:min-h-[50vh] lg:min-h-[70vh] overflow-hidden flex items-center">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover brightness-[0.35]"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="relative z-10 container mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl text-center md:text-left font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl md:max-w-lg lg:max-w-2xl capitalize">
          Nesh Auto Sales Used Car{" "}
          <span className="text-[var(--accent)]">Services</span>
        </h1>
        <p className="mt-2 text-center md:text-left max-w-xl text-lg md:text-xl text-white/80">
          Best Premium used car sales and services in the area
        </p>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 sm:left-5 sm:h-12 sm:w-12 touch-manipulation"
        aria-label="Previous slide"
      >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 sm:right-5 sm:h-12 sm:w-12 touch-manipulation"
        aria-label="Next slide"
      >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all touch-manipulation ${
              i === current ? "w-6 bg-[var(--accent)]" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Quick Actions */}
      <section className="relative overflow-hidden bg-neutral-900 py-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200')] bg-cover bg-center opacity-15" />
        <div className="relative mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          <a
            href="/inventory"
            className="group flex items-center justify-between gap-4 rounded-lg bg-neutral-800/80 px-6 py-6 transition hover:bg-neutral-700/80"
          >
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                Inventory
              </h3>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-white/50">
                Updated Regularly
              </p>
            </div>
            <svg className="h-14 w-14 shrink-0 text-white/30 transition group-hover:text-white/50" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="32" cy="36" r="22" />
              <path d="M32 20v16" strokeLinecap="round" />
              <path d="M32 36l10-10" strokeLinecap="round" />
              <path d="M22 16h20" strokeLinecap="round" />
              <circle cx="32" cy="36" r="3" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <a
            href="#contact"
            className="group flex items-center justify-between gap-4 rounded-lg bg-neutral-800/80 px-6 py-6 transition hover:bg-neutral-700/80"
          >
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                View Map
              </h3>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-white/50">
                &amp; Directions
              </p>
            </div>
            <svg className="h-14 w-14 shrink-0 text-white/30 transition group-hover:text-white/50" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8l16 8 16-8 8 4v40l-8-4-16 8-16-8-8 4V12l8-4z" />
              <path d="M28 16v40M44 8v40" />
              <path d="M20 28l4-4 4 4M36 24l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="38" cy="12" r="3" fill="currentColor" stroke="none">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </a>

          <a
            href="#contact"
            className="group flex items-center justify-between gap-4 rounded-lg bg-neutral-800/80 px-6 py-6 transition hover:bg-neutral-700/80"
          >
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                Contact Us
              </h3>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-white/50">
                For More Info
              </p>
            </div>
            <svg className="h-14 w-14 shrink-0 text-white/30 transition group-hover:text-white/50" viewBox="0 0 64 64" fill="currentColor">
              <path d="M8 12h48v32H26l-12 8v-8H8V12z" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="24" cy="28" r="2.5" />
              <circle cx="32" cy="28" r="2.5" />
              <circle cx="40" cy="28" r="2.5" />
            </svg>
          </a>
        </div>
      </section>



      {/* Recommended Cars */}
      <section id="listing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Recommended Cars</h2>
          <Link href="/inventory" className="text-sm text-[var(--accent)] hover:underline">
            View All →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {carsData.slice(0, 6).map((car) => (
            <Link key={car.id} href={`/inventory/${car.id}`} className="group">
              <article className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] transition hover:border-white/20">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={`/images/${car.images[0]}`}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-2xl font-bold text-white">
                    {car.price != null ? `$${car.price.toLocaleString("en-US")}` : "Price on request"}
                  </p>
                  <p className="mt-1 text-white/90">
                    {car.year} {car.make} {car.model} {car.trim}
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    {[car.transmission, car.mileage != null ? `${car.mileage.toLocaleString()} mi` : null, car.fuel].filter(Boolean).join(" · ")}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--accent)]">
                    {car.engine && <span>{car.engine}</span>}
                    {car.mpg && <span>{car.mpg.city}/{car.mpg.highway} MPG</span>}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Welcome & Search By Make */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1400"
            alt=""
            fill
            className="object-cover brightness-[0.2]"
          />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          {/* Left: Welcome */}
          <div>
            <h2 className="flex items-center gap-0 text-2xl font-bold text-white">
              <span className="mr-3 inline-block h-8 w-1 rounded bg-[var(--accent)]" />
              Welcome to Nesh Auto Used Cars
            </h2>
            <p className="mt-4 leading-relaxed text-white/80">
              Welcome to Nesh Auto Used Cars! At Nesh Auto, we understand that finding the
              perfect combination of quality and affordability can be difficult. So we have
              made it our goal to provide you and the surrounding areas with the best buying
              experience possible. Take a look through our website to see what fits your needs
              best! If you have any questions, feel free to contact us using our{" "}
              <a href="#contact" className="font-medium text-[var(--accent)] underline hover:text-white">
                Contact Us Form
              </a>{" "}
              or give us a call at{" "}
              <a href="tel:4704030168" className="font-medium text-white underline">
                (470) 403-0168
              </a>
              .
            </p>
          </div>

          {/* Right: Search By Make */}
          <div>
            <h2 className="text-2xl font-bold text-white">Search By Make</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {Array.from(new Set(carsData.map((c) => c.make)))
                .sort()
                .map((make) => (
                  <Link
                    key={make}
                    href={`/inventory?make=${encodeURIComponent(make)}`}
                    className="rounded border border-white/20 bg-white/5 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
                  >
                    {make}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    

      {/* About Us
      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white">About Us</h2>
            <p className="mt-4 text-white/80">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
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
            <Image src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800" alt="Luxury car" fill className="object-cover" />
          </div>
        </div>
      </section> */}

      {/* Our Service */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white">Our Services</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border-2 border-[var(--accent)]/50 bg-[var(--card)] p-8 text-center">
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

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white">Testimonials</h2>
        <div className="mt-8 flex gap-6 overflow-x-auto pb-4">
          {testimonials.map((t) => (
            <div key={t.name} className="min-w-[320px] max-w-md rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="flex items-center gap-4">
                <Image src={t.avatar} alt="" width={48} height={48} className="rounded-full object-cover" />
                <div>
                  <p className="font-medium text-white">{t.name}</p>
                  <p className="text-sm text-[var(--accent)]">{t.role}</p>
                </div>
              </div>
              <p className="mt-4 text-white/80">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--card)]">
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.96%2C40.76&layer=mapnik"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Contact</h2>
            <form className="mt-6 space-y-4">
              <Input placeholder="Name" className="bg-white/5 text-white placeholder:text-white/50" />
              <Input placeholder="Email Address" type="email" className="bg-white/5 text-white placeholder:text-white/50" />
              <Input placeholder="Phone, Skype, etc." className="bg-white/5 text-white placeholder:text-white/50" />
              <textarea placeholder="Enter your message here" rows={4} className="w-full rounded-lg border border-[var(--border)] bg-white/5 px-3 py-2 text-white placeholder:text-white/50" />
              <Button variant="primary" className="bg-[var(--accent)]">Send</Button>
            </form>
          </div>
        </div>
      </section>
      <CarBrandsSection />


      <Footer />
    </div>
  );
}
