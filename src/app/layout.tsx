import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OCBC Digital Banking",
  description: "Modern Banking Designed for the Digital You.",
  icons: {
    icon: "/meta-img.png",
    apple: "/meta-img.png",
  },
  openGraph: {
    title: "OCBC Digital Banking",
    description: "Modern Banking Designed for the Digital You.",
    images: ["/meta-img.png"],
  },
};

export const viewport: import('next').Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
