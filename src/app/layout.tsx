// layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Nunito, Inter, Roboto_Slab } from "next/font/google";

export const metadata: Metadata = {
  title: "Plataforma Cívica",
  description: "Aplicação Next.js",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-nunito",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-roboto-slab",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${nunito.variable} ${inter.variable} ${robotoSlab.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
