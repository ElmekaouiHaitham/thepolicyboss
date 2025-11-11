export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 font-heading">
            Privacy Policy
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4">
              At The Policy Boss, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 font-heading">
              Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We collect information that you provide directly to us, including your name, email address, phone number, and other information you submit through our forms.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 font-heading">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to provide you with insurance quotes, communicate with you, and improve our services.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 font-heading">
              Data Security
            </h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 font-heading">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy, please contact us at info@thepolicyboss.com.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

