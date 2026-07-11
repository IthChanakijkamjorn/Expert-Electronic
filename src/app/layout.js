import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Expert Electronic & Communication",
  description: "We plan, design, and install MATV, sound, LED, and CCTV systems for homes, venues, and commercial sites across Thailand.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Expert Electronic & Communication",
    description: "We plan, design, and install MATV, sound, LED, and CCTV systems for homes, venues, and commercial sites across Thailand.",
    url: "https://expertelectronic.co.th",
    siteName: "Expert Electronic & Communication",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
