import { Geist, Geist_Mono } from "next/font/google";
import LanguageProviderWrapper from "./_components/language-provider-wrapper";
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
  description: "เราวางแผน ออกแบบ และติดตั้งระบบ MATV ระบบเสียง LED และ CCTV สำหรับที่พักอาศัย สถานที่จัดงาน และอาคารพาณิชย์ทั่วประเทศไทย",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Expert Electronic & Communication",
    description: "เราวางแผน ออกแบบ และติดตั้งระบบ MATV ระบบเสียง LED และ CCTV สำหรับที่พักอาศัย สถานที่จัดงาน และอาคารพาณิชย์ทั่วประเทศไทย",
    url: "https://expertelectronic.co.th",
    siteName: "Expert Electronic & Communication",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProviderWrapper>{children}</LanguageProviderWrapper>
      </body>
    </html>
  );
}
