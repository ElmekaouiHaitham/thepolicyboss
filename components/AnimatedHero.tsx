'use client';

import Image from 'next/image';

export default function AnimatedHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-50 py-20 sm:py-32">
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl font-heading animate-fade-in-up">
              Protect What Matters Most
            </h1>
            <p className="mt-6 text-xl text-gray-600 sm:text-2xl animate-fade-in-up animation-delay-200">
              Get a Personalized Life Insurance Quote Today
            </p>
            <p className="mt-4 text-lg text-gray-500 animate-fade-in-up animation-delay-400">
              Fast, simple, and tailored to your needs in under 60 seconds.
            </p>
            <div className="mt-8 animate-fade-in-up animation-delay-600">
              <a
                href="#quote-form"
                className="inline-block rounded-lg bg-[#1e3a8a] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-[#2563eb] transition-all transform hover:scale-105 animate-pulse-slow"
              >
                Get Your Free Quote
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-up animation-delay-600">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-sm animate-float">
              <Image
                src="/hero2.png"
                alt="Happy family representing life insurance protection"
                width={500}
                height={500}
                className="w-full h-auto max-w-md object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

