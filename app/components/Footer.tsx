import Link from "next/link";

const linkCol1 = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
];
const linkCol2 = [
  { label: "FAQ", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Help", href: "#" },
  { label: "Careers", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center text-xl font-semibold">
              <span className="text-white">Auto</span>
              <span className="text-[var(--accent)]">Mart</span>
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
            <p className="text-white/80">contact@automart.com</p>
            <p className="mt-1 text-white/80">+1 (555) 123-4567</p>
            <div className="mt-4 flex gap-3">
              {["facebook", "twitter", "instagram", "linkedin"].map((name) => (
                <a key={name} href="#" className="text-white/60 hover:text-white" aria-label={name}>
                  <span className="h-5 w-5 rounded-full border border-white/40 flex items-center justify-center text-xs">f</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-[var(--border)] pt-6 text-center text-sm text-white/60">
          © 2024 AutoMart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
