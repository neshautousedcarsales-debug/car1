import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InventoryClient } from "./InventoryClient";

export const metadata: Metadata = {
  title: "Used Car Inventory",
  description:
    "Browse our used car inventory at Nesh Auto Sales Used Cars in Decatur, GA. Quality pre-owned vehicles with transparent pricing. Find your next car today.",
  openGraph: { title: "Used Car Inventory", description: "Browse quality used cars at Nesh Auto Sales Used Cars." },
};

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ make?: string }>;
}) {
  const filePath = path.join(process.cwd(), "cars.json");
  const data = await readFile(filePath, "utf-8");
  const cars = JSON.parse(data);
  const { make } = await searchParams;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <InventoryClient cars={cars} initialMake={make} />
      <Footer />
    </div>
  );
}
