import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
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
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
