import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Nesh Auto Sales Used Cars in Decatur, GA. Visit us at 2950 Midway Rd, call (470) 403-0168, or send a message. We're here to help you find your next car.",
  openGraph: { title: "Contact Us", description: "Get in touch with Nesh Auto Sales Used Cars — location, phone, and contact form." },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
