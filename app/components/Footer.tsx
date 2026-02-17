import Image from "next/image";
import Link from "next/link";

const linkCol1 = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];
const linkCol2 = [
  { label: "FAQ", href: "/faq" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Help", href: "/help" },
  { label: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo2.png"
                alt="Nesh Auto Sales Used Cars"
                width={200}
                height={80}
                className="h-14 w-auto object-contain sm:h-16"
              />
            </Link>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">Links</h4>
            <ul className="space-y-2">
              {linkCol1.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">Support</h4>
            <ul className="space-y-2">
              {linkCol2.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">Contact Us</h4>
            <p className="text-white/80">
              <a
                href="https://www.google.com/maps/search/?api=1&query=2950+Midway+Rd,+Decatur,+GA+30030"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                2950 Midway Rd, Decatur, GA 30030, United States
              </a>
            </p>
            <p className="mt-1 text-white/80">
              <a href="tel:+14704030168" className="hover:text-white">+1 470-403-0168</a>
            </p>
            <p className="mt-1 text-white/80">
              <a href="mailto:info@automart.com" className="hover:text-white">info@automart.com</a>
            </p>
           
          </div>
        </div>
        <p className="mt-10 border-t border-[var(--border)] pt-6 text-center text-sm text-white/60">
          © 2024 Nesh Auto Sales Used Cars. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
