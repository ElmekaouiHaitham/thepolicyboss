'use client';

import { useEffect, useState } from 'react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Made finding insurance stress-free — thank you!",
    author: "Sarah M.",
  },
  {
    id: 2,
    text: "Smooth and easy no complaints here.",
    author: "Michael R.",
  },
  {
    id: 3,
    text: "The process was so straightforward. Highly recommend!",
    author: "Jennifer L.",
  },
  {
    id: 4,
    text: "Excellent service and great rates. Couldn't be happier!",
    author: "David K.",
  },
  {
    id: 5,
    text: "Professional team that made everything simple and clear.",
    author: "Emily T.",
  },
  {
    id: 6,
    text: "Best insurance experience I've ever had. Truly impressed!",
    author: "Robert P.",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const getTestimonialIndex = (offset: number) => {
    return (currentIndex + offset + testimonials.length) % testimonials.length;
  };

  const StarRating = ({ size = 'h-5 w-5' }: { size?: string }) => (
    <div className="mb-4 flex text-yellow-400" aria-label="5 stars">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={size}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="relative w-full overflow-hidden py-8 md:py-12 px-4 sm:px-6">
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-4 lg:gap-6">
        {/* Left testimonial (smaller) - hidden on mobile */}
        <div className="hidden md:block">
          <blockquote
            className={`rounded-2xl bg-white p-4 shadow-lg transition-all duration-700 ease-in-out ${
              isTransitioning ? 'opacity-50' : ''
            }`}
            style={{
              transform: 'scale(0.8)',
              opacity: 0.6,
            }}
          >
            <StarRating size="h-4 w-4" />
            <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-3">
              "{testimonials[getTestimonialIndex(-2)].text}"
            </p>
            <footer className="text-xs font-semibold text-gray-900">
              — {testimonials[getTestimonialIndex(-2)].author}
            </footer>
          </blockquote>
        </div>

        {/* Left-middle testimonial (medium) - hidden on mobile/tablet */}
        <div className="hidden lg:block">
          <blockquote
            className={`rounded-2xl bg-white p-5 shadow-lg transition-all duration-700 ease-in-out ${
              isTransitioning ? 'opacity-50' : ''
            }`}
            style={{
              transform: 'scale(0.9)',
              opacity: 0.75,
            }}
          >
            <StarRating size="h-4 w-4" />
            <p className="text-sm md:text-base text-gray-700 mb-3">
              "{testimonials[getTestimonialIndex(-1)].text}"
            </p>
            <footer className="text-xs md:text-sm font-semibold text-gray-900">
              — {testimonials[getTestimonialIndex(-1)].author}
            </footer>
          </blockquote>
        </div>

        {/* Center testimonial (larger) - always visible */}
        <div className="z-10 w-full max-w-md sm:max-w-lg md:min-w-[320px] lg:min-w-[380px]">
          <blockquote
            className={`rounded-2xl bg-white p-6 md:p-8 shadow-2xl transition-all duration-700 ease-in-out border border-transparent md:border-2 md:border-[#e4d4ff] ${
              isTransitioning ? 'scale-105' : ''
            }`}
            style={{
              transform: isTransitioning ? 'scale(1.15)' : 'scale(1.1)',
            }}
          >
            <StarRating size="h-5 w-5 md:h-6 md:w-6" />
            <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4 font-medium">
              "{testimonials[currentIndex].text}"
            </p>
            <footer className="text-sm md:text-base font-semibold text-gray-900">
              — {testimonials[currentIndex].author}
            </footer>
          </blockquote>
        </div>

        {/* Right-middle testimonial (medium) - hidden on mobile/tablet */}
        <div className="hidden lg:block">
          <blockquote
            className={`rounded-2xl bg-white p-5 shadow-lg transition-all duration-700 ease-in-out ${
              isTransitioning ? 'opacity-50' : ''
            }`}
            style={{
              transform: 'scale(0.9)',
              opacity: 0.75,
            }}
          >
            <StarRating size="h-4 w-4" />
            <p className="text-sm md:text-base text-gray-700 mb-3">
              "{testimonials[getTestimonialIndex(1)].text}"
            </p>
            <footer className="text-xs md:text-sm font-semibold text-gray-900">
              — {testimonials[getTestimonialIndex(1)].author}
            </footer>
          </blockquote>
        </div>

        {/* Right testimonial (smaller) - hidden on mobile */}
        <div className="hidden md:block">
          <blockquote
            className={`rounded-2xl bg-white p-4 shadow-lg transition-all duration-700 ease-in-out ${
              isTransitioning ? 'opacity-50' : ''
            }`}
            style={{
              transform: 'scale(0.8)',
              opacity: 0.6,
            }}
          >
            <StarRating size="h-4 w-4" />
            <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-3">
              "{testimonials[getTestimonialIndex(2)].text}"
            </p>
            <footer className="text-xs font-semibold text-gray-900">
              — {testimonials[getTestimonialIndex(2)].author}
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="mt-6 md:mt-8 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-[#261538]'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

