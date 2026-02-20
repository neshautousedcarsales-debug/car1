import type { Metadata } from "next";
import { Josefin_Sans, Lato } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const josefinSans = Josefin_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const siteName = "Nesh Auto Sales Used Cars";
const defaultTitle = `${siteName} | Find Your Dream Car`;
const defaultDescription =
  "Nesh Auto Sales Used Cars — buy and sell used cars in Decatur, GA. Find your dream car today. Quality used cars, financing, and great service.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://neshautosales.com"),
  title: { default: defaultTitle, template: `%s | ${siteName}` },
  description: defaultDescription,
  keywords: ["used cars", "Decatur GA", "Nesh Auto", "used car dealership", "buy used car", "sell used car"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${josefinSans.variable} ${lato.variable} antialiased font-sans`}
      >
        {children}
      </body>
      <Script id="chatway" async={true} src="https://cdn.chatway.app/widget.js?id=FuFGWjnllXN5"></Script>
    </html>
  );
}
