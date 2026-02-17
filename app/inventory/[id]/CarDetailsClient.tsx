"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@heroui/react";

type Car = {
  id: string;
  price: number | null;
  stockNumber: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  bodyStyle: string | null;
  transmission: string | null;
  fuel: string;
  exteriorColor: string | null;
  interiorColor: string | null;
  engine: string;
  mileage: number | null;
  mpg?: { city: number; highway: number };
  condition: string;
  driveTrain?: string;
  carfax?: {
    oneOwner?: boolean;
    serviceHistoryRecords?: number;
    personalUse?: boolean;
  };
  images: string[];
};

function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  if (value == null || value === "") return null;
  return (
    <div className="flex justify-between gap-3 border-b border-[var(--border)] py-2.5 text-sm sm:gap-4 sm:py-3 sm:text-base">
      <span className="shrink-0 text-white/70">{label}</span>
      <span className="min-w-0 break-words text-right font-medium text-white">
        {String(value)}
      </span>
    </div>
  );
}

export function CarDetailsClient({ car }: { car: Car }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [inquiryMessage, setInquiryMessage] = useState("");

  const title = `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ""}`;
  const priceStr =
    car.price != null
      ? `$${car.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
      : "Price on request";

  async function handleInquirySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setInquiryStatus("sending");
    setInquiryMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          vehicleId: car.id,
          vehicleTitle: title,
          stockNumber: car.stockNumber,
          vehiclePrice: priceStr,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setInquiryStatus("error");
        setInquiryMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setInquiryStatus("success");
      setInquiryMessage("Thanks! We'll get back to you soon.");
      form.reset();
    } catch {
      setInquiryStatus("error");
      setInquiryMessage("Failed to send. Please try again or call (470) 403-0168.");
    }
  }

  const goToImage = (index: number) => {
    setSelectedImage(index);
    const container = thumbRef.current;
    if (!container) return;
    const thumb = container.children[index] as HTMLElement | undefined;
    if (thumb) {
      thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const prevImage = () => goToImage(selectedImage > 0 ? selectedImage - 1 : car.images.length - 1);
  const nextImage = () => goToImage(selectedImage < car.images.length - 1 ? selectedImage + 1 : 0);

  return (
    <div className="mx-auto max-w-7xl overflow-hidden px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex min-w-0 items-center gap-2 text-xs text-white/70 sm:mb-6 sm:text-sm">
        <Link href="/inventory" className="shrink-0 hover:text-white transition-colors">
          Inventory
        </Link>
        <span className="shrink-0">/</span>
        <span className="min-w-0 truncate text-white">{title}</span>
      </nav>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Left: Images */}
        <div className="min-w-0 lg:col-span-2 space-y-3 sm:space-y-4">
          {/* Main image with prev/next arrows */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] sm:aspect-video">
            <Image
              src={`/images/${car.images[selectedImage]}`}
              alt={`${title} - Image ${selectedImage + 1}`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />

            {/* Prev / Next arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80 sm:h-10 sm:w-10 touch-manipulation"
              aria-label="Previous image"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80 sm:h-10 sm:w-10 touch-manipulation"
              aria-label="Next image"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur sm:text-sm">
              {selectedImage + 1} / {car.images.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div
            id="images"
            ref={thumbRef}
            className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2"
          >
            {car.images.map((img, i) => (
              <button
                key={img}
                onClick={() => goToImage(i)}
                className={`relative h-14 w-[72px] shrink-0 snap-start overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-28 ${
                  selectedImage === i
                    ? "border-[var(--accent)] ring-1 ring-[var(--accent)]"
                    : "border-[var(--border)] hover:border-white/30"
                }`}
              >
                <Image
                  src={`/images/${img}`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 72px, 112px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details & Contact */}
        <div className="min-w-0 space-y-4 sm:space-y-6">
          {/* Details card */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6">
            <h1 className="text-lg font-bold leading-tight text-white sm:text-2xl">
              {title}
            </h1>
            <p className="mt-1.5 text-lg font-bold text-[var(--accent)] sm:mt-2 sm:text-2xl">
              {car.price != null
                ? `$${car.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                : "Price on request"}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/60 sm:text-sm">
              Stock #{car.stockNumber}
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>
              VIN: {car.vin}
            </p>

            <div className="mt-4 sm:mt-6">
              <SpecRow label="Year" value={car.year} />
              <SpecRow label="Make" value={car.make} />
              <SpecRow label="Model" value={car.model} />
              <SpecRow label="Trim" value={car.trim} />
              <SpecRow label="Condition" value={car.condition} />
              <SpecRow label="Body Style" value={car.bodyStyle} />
              <SpecRow label="Transmission" value={car.transmission} />
              <SpecRow label="Engine" value={car.engine} />
              <SpecRow label="Fuel Type" value={car.fuel} />
              <SpecRow label="Ext. Color" value={car.exteriorColor} />
              <SpecRow label="Int. Color" value={car.interiorColor} />
              <SpecRow
                label="Mileage"
                value={car.mileage != null ? car.mileage.toLocaleString() : null}
              />
              {car.mpg && (
                <SpecRow
                  label="MPG"
                  value={`${car.mpg.city} City / ${car.mpg.highway} Hwy`}
                />
              )}
              <SpecRow label="Drive Train" value={car.driveTrain} />
            </div>

            {car.carfax && (
              <div className="mt-4 rounded-lg border border-[var(--border)] bg-white/5 p-3 sm:mt-6 sm:p-4">
                <h3 className="mb-2 text-sm font-semibold text-white sm:mb-3 sm:text-base">
                  Carfax
                </h3>
                <ul className="space-y-2 text-xs text-white/80 sm:text-sm">
                  {car.carfax.oneOwner && (
                    <li className="flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/40 text-[10px]">
                        1
                      </span>
                      One Owner
                    </li>
                  )}
                  {car.carfax.serviceHistoryRecords != null && (
                    <li className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                      </svg>
                      {car.carfax.serviceHistoryRecords} Service History Records
                    </li>
                  )}
                  {car.carfax.personalUse && (
                    <li className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Personal Use
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Contact form */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Contact Us About This Vehicle
            </h2>
            <form onSubmit={handleInquirySubmit} className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
              <Input
                name="name"
                placeholder="Your Name"
                required
                className="bg-white/5 text-white placeholder:text-white/50"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="bg-white/5 text-white placeholder:text-white/50"
              />
              <Input
                name="phone"
                type="tel"
                placeholder="Phone"
                className="bg-white/5 text-white placeholder:text-white/50"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={3}
                required
                className="w-full rounded-lg border border-[var(--border)] bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 sm:text-base"
              />
              {inquiryMessage && (
                <p
                  className={`text-sm ${inquiryStatus === "success" ? "text-green-400" : "text-red-400"}`}
                >
                  {inquiryMessage}
                </p>
              )}
              <Button
                type="submit"
                isDisabled={inquiryStatus === "sending"}
                className="w-full min-h-[44px] bg-[var(--accent)] text-white touch-manipulation disabled:opacity-70"
              >
                {inquiryStatus === "sending" ? "Sending…" : "Send Inquiry"}
              </Button>
            </form>
          </div>

          <Link href="/inventory" className="block">
            <Button
              variant="ghost"
              className="w-full min-h-[44px] bg-white/10 text-white hover:bg-white/20 touch-manipulation"
            >
              ← Back to Inventory
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
