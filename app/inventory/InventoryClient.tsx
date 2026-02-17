"use client";

import { useMemo, useState } from "react";
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

type SortField = "year" | "make" | "price" | "mileage";
type SortDir = "asc" | "desc";

const CARFAX_ICONS = {
  oneOwner: (
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-xs font-medium">
      1
    </span>
  ),
  serviceHistory: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  personalUse: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  noAccidents: (
    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function InventoryClient({ cars, initialMake }: { cars: Car[]; initialMake?: string }) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("year");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [carfaxOneOwner, setCarfaxOneOwner] = useState(false);
  const [carfaxServiceHistory, setCarfaxServiceHistory] = useState(false);
  const [carfaxPersonalUse, setCarfaxPersonalUse] = useState(false);
  const [carfaxNoAccidents, setCarfaxNoAccidents] = useState(false);
  const [selectedMakes, setSelectedMakes] = useState<Set<string>>(
    () => new Set(initialMake ? [initialMake] : [])
  );
  const [page, setPage] = useState(1);

  const makesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    cars.forEach((c) => {
      counts[c.make] = (counts[c.make] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
  }, [cars]);

  const filteredAndSorted = useMemo(() => {
    let result = [...cars];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          `${c.year} ${c.make} ${c.model} ${c.trim}`.toLowerCase().includes(q) ||
          c.stockNumber.toLowerCase().includes(q) ||
          c.vin.toLowerCase().includes(q)
      );
    }

    if (carfaxOneOwner) {
      result = result.filter((c) => c.carfax?.oneOwner);
    }
    if (carfaxServiceHistory) {
      result = result.filter((c) => c.carfax?.serviceHistoryRecords != null && c.carfax.serviceHistoryRecords > 0);
    }
    if (carfaxPersonalUse) {
      result = result.filter((c) => c.carfax?.personalUse);
    }
    if (carfaxNoAccidents) {
      result = result.filter((c) => c.carfax != null);
    }

    if (selectedMakes.size > 0) {
      result = result.filter((c) => selectedMakes.has(c.make));
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "year":
          cmp = a.year - b.year;
          break;
        case "make":
          cmp = a.make.localeCompare(b.make);
          break;
        case "price":
          cmp = (a.price ?? 0) - (b.price ?? 0);
          break;
        case "mileage":
          cmp = (a.mileage ?? 0) - (b.mileage ?? 0);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [
    cars,
    search,
    sortField,
    sortDir,
    carfaxOneOwner,
    carfaxServiceHistory,
    carfaxPersonalUse,
    carfaxNoAccidents,
    selectedMakes,
  ]);

  const PER_PAGE = 6;
  const totalPages = Math.ceil(filteredAndSorted.length / PER_PAGE);
  const paginated = filteredAndSorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleMake = (make: string) => {
    setSelectedMakes((prev) => {
      const next = new Set(prev);
      if (next.has(make)) next.delete(make);
      else next.add(make);
      return next;
    });
    setPage(1);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:flex-row lg:gap-8 lg:px-8">
      {/* Sidebar */}
      <aside className="w-full shrink-0 space-y-4 lg:w-64 lg:space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/90">Search Keywords</label>
          <div className="flex gap-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="bg-white/5 text-white placeholder:text-white/50"
              size={1}
            />
            <Button
              isIconOnly
              variant="primary"
              className="shrink-0 bg-red-600 text-white hover:bg-red-700"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Sort By</h3>
          <div className="space-y-2">
            {(["year", "make", "price", "mileage"] as SortField[]).map((field) => (
              <button
                key={field}
                onClick={() => toggleSort(field)}
                className="flex w-full items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left text-sm text-white/90 transition hover:bg-white/5"
              >
                <span className="capitalize">{field}</span>
                <span className="flex items-center gap-1">
                  {sortField === field && (
                    <span className="text-[var(--accent)]">
                      {sortDir === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                  <svg className="h-4 w-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Carfax</h3>
          <div className="space-y-2">
            {[
              { key: "oneOwner", label: "One Owner", checked: carfaxOneOwner, set: setCarfaxOneOwner, icon: CARFAX_ICONS.oneOwner },
              { key: "serviceHistory", label: "Service History", checked: carfaxServiceHistory, set: setCarfaxServiceHistory, icon: CARFAX_ICONS.serviceHistory },
              { key: "personalUse", label: "Personal Use", checked: carfaxPersonalUse, set: setCarfaxPersonalUse, icon: CARFAX_ICONS.personalUse },
              { key: "noAccidents", label: "No Accidents", checked: carfaxNoAccidents, set: setCarfaxNoAccidents, icon: CARFAX_ICONS.noAccidents },
            ].map(({ key, label, checked, set, icon }) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 transition hover:bg-white/5"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    set(e.target.checked);
                    setPage(1);
                  }}
                  className="h-4 w-4 rounded border-[var(--border)] bg-white/5 text-[var(--accent)]"
                />
                <span className="text-[var(--accent)]">{icon}</span>
                <span className="text-sm text-white/90">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">By Make</h3>
          <div className="max-h-48 space-y-1 overflow-y-auto lg:max-h-64">
            {makesWithCounts.map(([make, count]) => (
              <button
                key={make}
                onClick={() => toggleMake(make)}
                className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm transition ${
                  selectedMakes.has(make)
                    ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                    : "text-white/80 hover:bg-white/5"
                }`}
              >
                <span>{make}</span>
                <span className="text-white/60">({count})</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-sm text-white/80 sm:text-base">
            <span className="font-semibold text-white">{filteredAndSorted.length}</span> search results
          </p>
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm text-white/90 disabled:opacity-50 hover:bg-white/5"
            >
              &lt;
            </button>
            {(() => {
              const pages: number[] = [];
              if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                for (let i = 0; i < 5; i++) pages.push(start + i);
              }
              return pages.map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`min-w-[2rem] rounded px-2 py-1.5 text-sm ${
                    page === p
                      ? "bg-[var(--accent)] text-white"
                      : "border border-[var(--border)] bg-[var(--card)] text-white/90 hover:bg-white/5"
                  }`}
                >
                  {p}
                </button>
              ));
            })()}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm text-white/90 disabled:opacity-50 hover:bg-white/5"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((car) => (
            <article
              key={car.id}
              className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={`/images/${car.images[0]}`}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-base font-semibold text-white sm:text-lg">
                  {car.year} {car.make} {car.model}
                </h3>
                <p className="mt-1 text-base font-bold text-[var(--accent)] sm:text-lg">
                  {car.price != null ? `$${car.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "Price on request"}
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Link href={`/inventory/${car.id}`} className="w-full sm:w-auto">
                    <Button size="sm" variant="primary" className="w-full bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                      Contact Us
                    </Button>
                  </Link>
                  <Link href={`/inventory/${car.id}#images`} className="w-full sm:w-auto">
                    <Button size="sm" variant="primary" className="w-full bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                      View Images
                    </Button>
                  </Link>
                  <Link href={`/inventory/${car.id}`} className="w-full sm:flex-1">
                    <Button size="sm" className="w-full min-h-[40px] bg-[var(--accent)] text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {paginated.length === 0 && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-12 text-center text-white/70">
            No vehicles match your search. Try adjusting your filters.
          </div>
        )}
      </main>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-lg bg-black text-white shadow-lg transition hover:bg-white/20 sm:bottom-6 sm:right-6 sm:h-10 sm:w-10 touch-manipulation"
        aria-label="Scroll to top"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
