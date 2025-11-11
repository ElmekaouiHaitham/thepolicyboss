export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 font-heading">
            Terms of Service
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4">
              Please read these Terms of Service carefully before using The Policy Boss website.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 font-heading">
              Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 font-heading">
              Use License
            </h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily access the materials on The Policy Boss website for personal, non-commercial transitory viewing only.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 font-heading">
              Disclaimer
            </h2>
            <p className="text-gray-700 mb-4">
              The materials on The Policy Boss website are provided on an 'as is' basis. The Policy Boss makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 font-heading">
              Limitations
            </h2>
            <p className="text-gray-700 mb-4">
              In no event shall The Policy Boss or its suppliers be liable for any damages arising out of the use or inability to use the materials on The Policy Boss website.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 font-heading">
              Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us at info@thepolicyboss.com.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

