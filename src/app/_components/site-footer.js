import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-[#00004d]/10 bg-white/60 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Company Info */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/50">
              Company
            </p>
            <p className="text-base font-semibold text-[#0c0c2a]">
              Expert Electronic &amp; Communication Co., LTD.
            </p>
            <p className="text-sm leading-6 text-[#4b4b6a]">
              51/2 Soi Ramkhamhaeng 96,<br />
              Ramkhamhaeng Road,<br />
              Saphan Sung District,<br />
              Bangkok 10240
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/50">
              Contact
            </p>
            <a
              href="tel:027294225"
              className="flex items-center gap-2 text-sm text-[#4b4b6a] transition hover:text-[#00004d]"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              02 729 4225
            </a>
            <a
              href="mailto:admin@expertelectronic.co.th"
              className="flex items-center gap-2 text-sm text-[#4b4b6a] transition hover:text-[#00004d]"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              admin@expertelectronic.co.th
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/50">
              Quick Links
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Solutions", href: "/solutions" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#4b4b6a] transition hover:text-[#00004d]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#00004d]/10 pt-6">
          <p className="text-center text-xs text-[#00004d]/40">
            &copy; 2026 Expert Electronic &amp; Communication. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
