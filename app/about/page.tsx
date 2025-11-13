import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - The Policy Boss",
  description: "Learn about The Policy Boss - making life insurance simple, transparent, and accessible. Our mission is to help you find the right coverage without the hassle.",
  keywords: ["about the policy boss", "life insurance company", "insurance agency", "insurance mission"],
  openGraph: {
    title: "About Us - The Policy Boss",
    description: "Making life insurance simple, transparent, and accessible for everyone.",
    url: "https://thepolicyboss.com/about",
  },
  alternates: {
    canonical: "https://thepolicyboss.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-[#faf7ff] via-white to-[#faf7ff] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl font-heading">
            About The Policy Boss
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Making life insurance simple, transparent, and accessible for everyone
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed">
              At The Policy Boss, we believe insurance should be simple and transparent. 
              Too many people are overwhelmed by complex policies, confusing terms, and 
              pushy sales tactics. We're here to change that.
            </p>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Our mission is to help you find the right life insurance coverage that fits 
              your needs and budget, without the hassle. We cut through the jargon and 
              provide clear, honest guidance every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Founder/Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-heading">
            Our Story
          </h2>
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="shrink-0">
                <div className="relative h-32 w-32 rounded-full bg-linear-to-br from-[#f3ecff] to-[#e4d4ff] mx-auto md:mx-0 overflow-hidden">
                  <Image
                    src="/mission.jpg"
                    alt="The Policy Boss mission"
                    fill
                    className="object-cover"
                    sizes="128px"
                    priority
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Policy Boss was founded with a simple goal: to make life insurance 
                  accessible and understandable for everyone. We saw too many people 
                  struggling to navigate the complex world of insurance, and we knew there 
                  had to be a better way.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our team of licensed insurance experts is dedicated to providing personalized 
                  service and honest advice. We don't believe in one-size-fits-all solutions. 
                  Instead, we take the time to understand your unique situation and help you 
                  find the coverage that truly fits your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center font-heading">
            Our Promise
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3ecff]">
                <svg
                  className="h-8 w-8 text-[#261538]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                Trust
              </h3>
              <p className="text-gray-600">
                We're committed to honesty and transparency. No hidden fees, no surprises, 
                just straightforward guidance you can trust.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3ecff]">
                <svg
                  className="h-8 w-8 text-[#261538]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                Simplicity
              </h3>
              <p className="text-gray-600">
                We break down complex insurance concepts into simple, easy-to-understand 
                language. No jargon, no confusion.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3ecff]">
                <svg
                  className="h-8 w-8 text-[#261538]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                Transparency
              </h3>
              <p className="text-gray-600">
                Clear pricing, honest recommendations, and full disclosure. You'll always 
                know exactly what you're getting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-[#261538] to-[#3b205d] text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl font-heading">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-xl">
            Get your personalized quote in under 60 seconds.
          </p>
          <div className="mt-8">
            <Link
              href="/#quote-form"
              className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#261538] shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Start Your Free Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

