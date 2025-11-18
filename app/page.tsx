import Link from "next/link";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import AnimatedHero from "@/components/AnimatedHero";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import StoryHighlight from "@/components/StoryHighlight";
import { fetchBlogSummaries } from "@/lib/blogApi";
import type { BlogSummary } from "@/types/blog";
import { socialLinks } from "@/lib/socialLinks";

export const metadata: Metadata = {
  title: "Get Your Free Life Insurance Quote in 60 Seconds",
  description:
    "Protect what matters most with personalized life insurance quotes. Fast, simple, and tailored to your needs. Get your free quote in under 60 seconds from licensed experts.",
  keywords: [
    "life insurance quote",
    "free life insurance quote",
    "life insurance online",
    "term life insurance",
    "whole life insurance",
    "affordable life insurance",
  ],
  openGraph: {
    title: "Get Your Free Life Insurance Quote in 60 Seconds | The Policy Boss",
    description:
      "Protect what matters most with personalized life insurance quotes. Fast, simple, and tailored to your needs.",
    url: "https://thepolicyboss.com",
  },
  alternates: {
    canonical: "https://thepolicyboss.com",
  },
};

export default async function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: "The Policy Boss",
    description: "Simple, smart, and secure life insurance quotes",
    url: "https://thepolicyboss.com",
    logo: "https://thepolicyboss.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-POLICY-BOSS",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
    sameAs: [
      socialLinks.facebook,
      "https://www.twitter.com/thepolicyboss",
      "https://www.linkedin.com/company/thepolicyboss",
      socialLinks.instagram,
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Policy Boss",
    url: "https://thepolicyboss.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://thepolicyboss.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  let featuredPosts: BlogSummary[] = [];
  try {
    const posts = await fetchBlogSummaries();
    featuredPosts = posts.slice(0, 3);
  } catch (error) {
    featuredPosts = [];
  }

  return (
    <>
      <StructuredData data={[organizationSchema, websiteSchema]} />
      <main className="min-h-screen">
        {/* Hero Section */}
        <AnimatedHero />

        {/* Quick Lead Capture Form */}
        <section
          id="quote-form"
          className="py-16 bg-white"
          aria-labelledby="quote-form-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="quote-form-heading" className="sr-only">
              Get Your Free Life Insurance Quote
            </h2>
            <LeadForm />
          </div>
        </section>

        {/* Why Choose The Policy Boss */}
        <section
          className="py-16 bg-linear-to-b from-white to-[#faf7ff]"
          aria-labelledby="why-choose-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                id="why-choose-heading"
                className="text-3xl font-bold text-gray-900 sm:text-4xl font-heading"
              >
                Why Choose The Policy Boss
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We make life insurance simple, transparent, and tailored to you
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f3ecff]">
                  <svg
                    className="h-6 w-6 text-[#261538]"
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
                  Customized insurance solutions that fit your unique needs and
                  budget.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f3ecff]">
                  <svg
                    className="h-6 w-6 text-[#261538]"
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
                  Our team of licensed professionals is here to guide you every
                  step of the way.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f3ecff]">
                  <svg
                    className="h-6 w-6 text-[#261538]"
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
                  Transparent pricing with no surprises. What you see is what
                  you get.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f3ecff]">
                  <svg
                    className="h-6 w-6 text-[#261538]"
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
                  Get instant quotes in under 60 seconds. No lengthy paperwork
                  required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          className="py-16 bg-white"
          aria-labelledby="how-it-works-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                id="how-it-works-heading"
                className="text-3xl font-bold text-gray-900 sm:text-4xl font-heading"
              >
                How It Works
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Getting your personalized quote is simple and fast
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f3ecff]">
                  <span className="text-3xl font-bold text-[#261538]">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                  Fill Out Your Info
                </h3>
                <p className="text-gray-600">
                  Complete our simple form with your basic information. It only
                  takes a minute.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f3ecff]">
                  <span className="text-3xl font-bold text-[#261538]">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                  We Match You with the Best Plans
                </h3>
                <p className="text-gray-600">
                  Our system analyzes your needs and matches you with the best
                  insurance options.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f3ecff]">
                  <span className="text-3xl font-bold text-[#261538]">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                  Get Your Quote Instantly or via Email
                </h3>
                <p className="text-gray-600">
                  Receive your personalized quote immediately or have it sent to
                  your email.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials / Trust Section */}
        <section
          className="py-16 bg-linear-to-b from-[#faf7ff] to-white"
          aria-labelledby="testimonials-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                id="testimonials-heading"
                className="text-3xl font-bold text-gray-900 sm:text-4xl font-heading"
              >
                What Our Clients Say
              </h2>
            </div>
            <TestimonialCarousel />

            {/* Story Highlight Section */}
            <StoryHighlight />

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-[#261538]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Verified Partner</span>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Teaser Section */}
        <section
          className="py-16 bg-white"
          aria-labelledby="blog-teaser-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                id="blog-teaser-heading"
                className="text-3xl font-bold text-gray-900 sm:text-4xl font-heading"
              >
                Learn More About Life Insurance
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Helpful articles to guide your insurance decisions
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {featuredPosts.length === 0 ? (
                <div className="md:col-span-3 rounded-2xl bg-white border border-gray-200 p-12 text-center">
                  <p className="text-gray-600 text-lg mb-4">
                    Blog posts are on the way. Check back soon for fresh insights.
                  </p>
                  <Link
                    href="/blog"
                    className="text-[#3b205d] font-medium hover:text-[#261538] transition-colors"
                  >
                    Visit the blog →
                  </Link>
                </div>
              ) : (
                featuredPosts.map((post, index) => (
                  <article
                    key={post.slug}
                    className="rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={`Featured image for ${post.title}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-3 text-sm text-[#3b205d] font-semibold">
                        <span className="rounded-full bg-[#f3ecff] px-3 py-1">
                          {post.category}
                        </span>
                        <time className="text-gray-500 font-normal">
                          {post.date}
                        </time>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-[#3b205d] transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[#3b205d] font-medium hover:text-[#261538] inline-flex items-center gap-2 transition-colors"
                        aria-label={`Read more about ${post.title}`}
                      >
                        Read More
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Final Call-to-Action */}
        <section className="py-16 bg-linear-to-r from-[#261538] to-[#3b205d] text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold sm:text-4xl font-heading">
              Ready to secure your future?
            </h2>
            <p className="mt-4 text-xl">Let's find the right policy for you.</p>
            <div className="mt-8">
              <a
                href="#quote-form"
                className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#261538] shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
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
