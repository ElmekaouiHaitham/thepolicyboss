import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Get Your Free Life Insurance Quote in 60 Seconds",
  description: "Protect what matters most with personalized life insurance quotes. Fast, simple, and tailored to your needs. Get your free quote in under 60 seconds from licensed experts.",
  keywords: ["life insurance quote", "free life insurance quote", "life insurance online", "term life insurance", "whole life insurance", "affordable life insurance"],
  openGraph: {
    title: "Get Your Free Life Insurance Quote in 60 Seconds | The Policy Boss",
    description: "Protect what matters most with personalized life insurance quotes. Fast, simple, and tailored to your needs.",
    url: "https://thepolicyboss.com",
  },
  alternates: {
    canonical: "https://thepolicyboss.com",
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "The Policy Boss",
    "description": "Simple, smart, and secure life insurance quotes",
    "url": "https://thepolicyboss.com",
    "logo": "https://thepolicyboss.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-POLICY-BOSS",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/thepolicyboss",
      "https://www.twitter.com/thepolicyboss",
      "https://www.linkedin.com/company/thepolicyboss"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Policy Boss",
    "url": "https://thepolicyboss.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://thepolicyboss.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <StructuredData data={[organizationSchema, websiteSchema]} />
      <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl font-heading">
                Protect What Matters Most
              </h1>
              <p className="mt-6 text-xl text-gray-600 sm:text-2xl">
                Get a Personalized Life Insurance Quote Today
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Fast, simple, and tailored to your needs in under 60 seconds.
              </p>
              <div className="mt-8">
                <a
                  href="#quote-form"
                  className="inline-block rounded-lg bg-[#1e3a8a] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-[#2563eb] transition-all transform hover:scale-105"
                >
                  Get Your Free Quote
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 p-8 shadow-xl">
                <div className="aspect-square rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center" role="img" aria-label="Family protection and life insurance illustration">
                  <svg
                    className="w-48 h-48 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Lead Capture Form */}
      <section id="quote-form" className="py-16 bg-white" aria-labelledby="quote-form-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="quote-form-heading" className="sr-only">Get Your Free Life Insurance Quote</h2>
          <LeadForm />
        </div>
      </section>

      {/* Why Choose The Policy Boss */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50" aria-labelledby="why-choose-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="why-choose-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl font-heading">
              Why Choose The Policy Boss
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We make life insurance simple, transparent, and tailored to you
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                Tailored Plans for Every Lifestyle
              </h3>
              <p className="text-gray-600">
                Customized insurance solutions that fit your unique needs and budget.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                Licensed Experts Ready to Help
              </h3>
              <p className="text-gray-600">
                Our team of licensed professionals is here to guide you every step of the way.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                No Hidden Fees or Complications
              </h3>
              <p className="text-gray-600">
                Transparent pricing with no surprises. What you see is what you get.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                Fast Online Quotes
              </h3>
              <p className="text-gray-600">
                Get instant quotes in under 60 seconds. No lengthy paperwork required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="how-it-works-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl font-heading">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Getting your personalized quote is simple and fast
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                Fill Out Your Info
              </h3>
              <p className="text-gray-600">
                Complete our simple form with your basic information. It only takes a minute.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                We Match You with the Best Plans
              </h3>
              <p className="text-gray-600">
                Our system analyzes your needs and matches you with the best insurance options.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <span className="text-3xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                Get Your Quote Instantly or via Email
              </h3>
              <p className="text-gray-600">
                Receive your personalized quote immediately or have it sent to your email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Trust Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl font-heading">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <blockquote className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-4 flex text-yellow-400" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Made finding insurance stress-free — thank you!"
              </p>
              <footer className="text-sm font-semibold text-gray-900">— Sarah M.</footer>
            </blockquote>

            <blockquote className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-4 flex text-yellow-400" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Quick, easy, and I actually understood my options."
              </p>
              <footer className="text-sm font-semibold text-gray-900">— Michael R.</footer>
            </blockquote>

            <blockquote className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-4 flex text-yellow-400" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The process was so straightforward. Highly recommend!"
              </p>
              <footer className="text-sm font-semibold text-gray-900">— Jennifer L.</footer>
            </blockquote>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Verified Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Teaser Section */}
      <section className="py-16 bg-white" aria-labelledby="blog-teaser-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="blog-teaser-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl font-heading">
              Learn More About Life Insurance
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Helpful articles to guide your insurance decisions
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <article className="rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200" role="img" aria-label="Life insurance planning illustration"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                  <Link
                    href="/blog/5-things-to-know-before-buying-life-insurance"
                    className="hover:text-blue-600 transition-colors"
                  >
                    5 Things to Know Before Buying Life Insurance
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  Essential information to help you make an informed decision about life insurance.
                </p>
                <Link
                  href="/blog/5-things-to-know-before-buying-life-insurance"
                  className="text-blue-600 font-medium hover:text-blue-700"
                  aria-label="Read more about 5 Things to Know Before Buying Life Insurance"
                >
                  Read More →
                </Link>
              </div>
            </article>

            <article className="rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200" role="img" aria-label="Insurance coverage calculation illustration"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                  <Link
                    href="/blog/how-much-coverage-do-you-really-need"
                    className="hover:text-blue-600 transition-colors"
                  >
                    How Much Coverage Do You Really Need?
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  Calculate the right amount of coverage for your unique situation and goals.
                </p>
                <Link
                  href="/blog/how-much-coverage-do-you-really-need"
                  className="text-blue-600 font-medium hover:text-blue-700"
                  aria-label="Read more about How Much Coverage Do You Really Need"
                >
                  Read More →
                </Link>
              </div>
            </article>

            <article className="rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200" role="img" aria-label="Term vs whole life insurance comparison illustration"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                  <Link
                    href="/blog/term-vs-whole-life-insurance"
                    className="hover:text-blue-600 transition-colors"
                  >
                    The Difference Between Term and Whole Life Insurance
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  Understanding the key differences to choose the right policy for you.
                </p>
                <Link
                  href="/blog/term-vs-whole-life-insurance"
                  className="text-blue-600 font-medium hover:text-blue-700"
                  aria-label="Read more about The Difference Between Term and Whole Life Insurance"
                >
                  Read More →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl font-heading">
            Ready to secure your future?
          </h2>
          <p className="mt-4 text-xl">
            Let's find the right policy for you.
          </p>
          <div className="mt-8">
            <a
              href="#quote-form"
              className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#1e3a8a] shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Get My Free Quote
            </a>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
