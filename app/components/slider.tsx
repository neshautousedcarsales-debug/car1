"use client";

import { useState } from "react";
import Container from "./container";

const BRANDFETCH_CDN = "https://cdn.brandfetch.io";
const CLIENT_ID =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID
    ? process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID
    : "1iduabumTrXPqrxWWzs";

function BrandLogo({ brand }: { brand: { name: string; domain: string } }) {
  const [error, setError] = useState(false);
  const logoUrl = `${BRANDFETCH_CDN}/${brand.domain}/w/200/h/200/theme/light/logo?c=${CLIENT_ID}`;

  if (error) {
    return (
      <div className="flex h-16 w-32 items-center justify-center rounded-lg bg-white/5 px-4">
        <span className="text-center text-sm font-medium text-white/90">
          {brand.name}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoUrl}
      alt={brand.name}
      width={128}
      height={64}
      className="h-16 w-32 object-contain opacity-90 transition-opacity hover:opacity-100"
      onError={() => setError(true)}
    />
  );
}

const carBrands = [
  { name: "Honda", domain: "honda.com" },
  { name: "Toyota", domain: "toyota.com" },
  { name: "Nissan", domain: "nissanusa.com" },
  { name: "Ford", domain: "ford.com" },
  { name: "Chevrolet", domain: "chevrolet.com" },
  { name: "BMW", domain: "bmw.com" },
  { name: "Mercedes-Benz", domain: "mercedes-benz.com" },
  { name: "Audi", domain: "audi.com" },
  { name: "Tesla", domain: "tesla.com" },
  { name: "Volkswagen", domain: "volkswagen.com" },
  { name: "Hyundai", domain: "hyundai.com" },
  { name: "Kia", domain: "kia.com" },
 
  { name: "Mazda", domain: "mazda.com" },

  { name: "Lexus", domain: "lexus.com" },
  { name: "Jeep", domain: "jeep.com" },
  
];

export default function CarBrandsSection() {
  return (
    <section className="py-16 bg-[var(--background)] overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Brands We Carry
          </h2>
          <p className="mt-2 text-white/70">
            Explore our wide selection of quality vehicles
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* First row - moving left */}
          <div className="flex animate-scroll-left">
            {[...carBrands, ...carBrands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="shrink-0 mx-8 flex items-center justify-center h-16 w-32"
              >
                <BrandLogo brand={brand} />
              </div>
            ))}
          </div>

          {/* Second row - moving right */}
          <div className="flex animate-scroll-right mt-8">
            {[...carBrands].reverse().concat([...carBrands].reverse()).map(
              (brand, index) => (
                <div
                  key={`${brand.name}-rev-${index}`}
                  className="shrink-0 mx-8 flex items-center justify-center h-16 w-32"
                >
                  <BrandLogo brand={brand} />
                </div>
              )
            )}
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
}