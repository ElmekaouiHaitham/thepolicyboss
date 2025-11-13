'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3" aria-label="The Policy Boss - Home">
            <Image
              src="/logo.svg"
              alt="The Policy Boss logo"
              width={40}
              height={40}
              className="hidden h-9 w-9 sm:block"
              priority
            />
            <span className="text-2xl font-bold text-[#261538] font-heading">
              The Policy Boss
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#3b205d] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-[#3b205d] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#3b205d] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#3b205d] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/#quote-form"
              className="rounded-lg bg-[#261538] px-6 py-2 text-white font-medium hover:bg-[#3b205d] transition-colors"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-700 hover:text-[#3b205d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="block text-gray-700 hover:text-[#3b205d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-[#3b205d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-[#3b205d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="#quote-form"
              className="block rounded-lg bg-[#261538] px-6 py-2 text-white font-medium hover:bg-[#3b205d] transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

