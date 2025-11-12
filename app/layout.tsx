import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thepolicyboss.com'),
  title: {
    default: "The Policy Boss - Simple, Smart, Secure Life Insurance",
    template: "%s | The Policy Boss"
  },
  description: "Get a personalized life insurance quote in under 60 seconds. Fast, simple, and tailored to your needs. Licensed experts ready to help you find the perfect coverage.",
  keywords: ["life insurance", "life insurance quote", "term life insurance", "whole life insurance", "insurance quotes", "life insurance online", "affordable life insurance", "life insurance comparison"],
  authors: [{ name: "The Policy Boss" }],
  creator: "The Policy Boss",
  publisher: "The Policy Boss",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thepolicyboss.com",
    siteName: "The Policy Boss",
    title: "The Policy Boss - Simple, Smart, Secure Life Insurance",
    description: "Get a personalized life insurance quote in under 60 seconds. Fast, simple, and tailored to your needs.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Policy Boss - Life Insurance Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Policy Boss - Simple, Smart, Secure Life Insurance",
    description: "Get a personalized life insurance quote in under 60 seconds.",
    images: ["/og-image.jpg"],
    creator: "@thepolicyboss",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://thepolicyboss.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
