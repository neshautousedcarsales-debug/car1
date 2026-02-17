import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CarDetailsClient } from "../[id]/CarDetailsClient";

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

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const filePath = path.join(process.cwd(), "cars.json");
  const data = await readFile(filePath, "utf-8");
  const cars: Car[] = JSON.parse(data);
  const car = cars.find((c) => c.id === id || c.stockNumber === id);

  if (!car) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)] overflow-x-hidden">
      <Header />
      <CarDetailsClient car={car} />
      <Footer />
    </div>
  );
}
