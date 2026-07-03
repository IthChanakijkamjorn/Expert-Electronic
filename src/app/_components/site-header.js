import Link from "next/link";
import { playfair } from "./brand-fonts";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-[#00004d] text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] animate-nav-drop">
      <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xs font-semibold tracking-[0.35em]">
            EE
          </span>
          <p className={`${playfair.className} text-lg font-semibold`}>
            Expert Electronic &amp; Communication
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80 md:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="transition hover:text-white"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded-full border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/90">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/15 bg-[#05054f] p-3 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              <nav
                aria-label="Mobile"
                className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
