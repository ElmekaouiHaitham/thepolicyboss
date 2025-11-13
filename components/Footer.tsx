import Link from 'next/link';

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
          </div>
        </div>

        <div className="mt-8 border-t border-[#26263a] pt-8 text-center text-sm text-gray-500">
          <p>&copy; <time dateTime={new Date().getFullYear().toString()}>{new Date().getFullYear()}</time> The Policy Boss. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

