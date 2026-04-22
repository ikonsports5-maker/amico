import type { Metadata } from "next";
import { Jost } from 'next/font/google';
import "./globals.css";

const jost = Jost({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Amico Sports Infra",
  description: "Amico Sports Infra is a leading sports infrastructure company in India, providing world-class sports facilities for all sports, from football turf to pickleball courts and basketball courts.",
  icons: {
    icon: "/images/amico-sticker.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
