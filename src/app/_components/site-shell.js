import { inter } from "./brand-fonts";
import SiteFooter from "./site-footer";

export default function SiteShell({ children }) {
  return (
    <div
      className={`${inter.className} relative min-h-screen bg-[#f7f3ec] text-[#15152e]`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,0,77,0.22),_transparent_70%)] blur-3xl animate-float-slow"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="absolute bottom-0 right-[-120px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,179,71,0.28),_transparent_70%)] blur-3xl animate-float-slower"
          style={{ animationDelay: "600ms" }}
        />
        <div
          className="absolute left-[-120px] top-[40%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(12,95,140,0.18),_transparent_70%)] blur-3xl animate-float-slow"
          style={{ animationDelay: "900ms" }}
        />
      </div>
      {children}
      <SiteFooter />
    </div>
  );
}
