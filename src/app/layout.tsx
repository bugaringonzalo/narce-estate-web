import type { Metadata } from "next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arce Monsegur - Estrategias en Real Estate y Finanzas",
    template: "%s | Arce Monsegur",
  },
  description: "Estrategias inmobiliarias con visión financiera. Inversiones, compra, venta, alquileres y renta temporaria en Buenos Aires.",
  keywords: ["inmobiliaria", "inversiones inmobiliarias", "real estate", "Buenos Aires", "compra venta", "alquileres", "alquiler temporal", "estrategia inmobiliaria"],
  authors: [{ name: "Arce Monsegur" }],
  creator: "Arce Monsegur",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Arce Monsegur",
    title: "Arce Monsegur - Estrategias en Real Estate y Finanzas",
    description: "Estrategias inmobiliarias con visión financiera. Inversiones, compra, venta, alquileres y renta temporaria en Buenos Aires.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arce Monsegur - Estrategias en Real Estate y Finanzas",
    description: "Estrategias inmobiliarias con visión financiera en Buenos Aires.",
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
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
