import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'OCBC Digital Banking',
  description: 'Modern Banking Designed for the Digital You.',
  icons: {
    icon: '/meta-img.png',
    apple: '/meta-img.png',
  },
  openGraph: {
    title: 'OCBC Digital Banking',
    description: 'Modern Banking Designed for the Digital You.',
    images: ['/meta-img.png'],
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
      <head>
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a9b47e7d862ed3449e55818/1k1n91ojf';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full">
        {children}
      </body>
    </html>
  );
}
