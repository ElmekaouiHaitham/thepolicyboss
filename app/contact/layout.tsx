import type { Metadata } from 'next';
import 'katex/dist/katex.min.css'

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch | The Policy Boss",
  description: "Have questions about life insurance? Contact The Policy Boss. We usually reply within 24 hours. Get your free quote or speak with our licensed experts.",
  keywords: ["contact the policy boss", "life insurance contact", "insurance help", "insurance support"],
  openGraph: {
    title: "Contact Us - Get in Touch | The Policy Boss",
    description: "Have questions about life insurance? Contact us - we usually reply within 24 hours.",
    url: "https://thepolicyboss.com/contact",
  },
  alternates: {
    canonical: "https://thepolicyboss.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

