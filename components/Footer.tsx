import Link from 'next/link';
import { socialLinks } from '@/lib/socialLinks';

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-[#0f0f17] via-[#11111d] to-[#151023] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-heading">
              The Policy Boss
            </h3>
            <p className="text-sm text-gray-400">
              Simple. Smart. Secure.
            </p>
            <p className="text-sm text-gray-500">
              Making life insurance simple and transparent for everyone.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="transition-colors hover:text-[#cbb7ff]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-[#cbb7ff]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-[#cbb7ff]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#cbb7ff]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-[#cbb7ff]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-[#cbb7ff]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#cbb7ff]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#quote-form" className="transition-colors hover:text-[#cbb7ff]">
                  Get Free Quote
                </Link>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-4">
              <Link
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full border border-[#2f2942] text-gray-400 transition-all hover:text-white hover:border-[#cbb7ff]"
                aria-label="Follow The Policy Boss on Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 12a10 10 0 10-11.5 9.87v-6.99H8.1V12h2.4V9.79c0-2.37 1.42-3.68 3.6-3.68 1.04 0 2.12.18 2.12.18v2.33h-1.19c-1.17 0-1.54.73-1.54 1.48V12h2.62l-.42 2.88h-2.2v6.99A10 10 0 0022 12z" />
                </svg>
              </Link>
              <Link
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full border border-[#2f2942] text-gray-400 transition-all hover:text-white hover:border-[#cbb7ff]"
                aria-label="Follow The Policy Boss on Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm10 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#26263a] pt-8 text-center text-sm text-gray-500">
          <p>&copy; <time dateTime={new Date().getFullYear().toString()}>{new Date().getFullYear()}</time> The Policy Boss. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

