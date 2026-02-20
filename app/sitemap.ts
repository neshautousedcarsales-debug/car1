import type { MetadataRoute } from "next";
import { readFile } from "fs/promises";
import path from "path";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://neshautosales.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/inventory`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  let carUrls: MetadataRoute.Sitemap = [];
  try {
    const filePath = path.join(process.cwd(), "cars.json");
    const data = await readFile(filePath, "utf-8");
    const cars: { id: string }[] = JSON.parse(data);
    carUrls = cars.map((car) => ({
      url: `${baseUrl}/inventory/${car.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // ignore if cars.json missing or invalid
  }

  return [...staticRoutes, ...carUrls];
}
