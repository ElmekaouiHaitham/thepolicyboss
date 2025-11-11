'use client';

import { useState, FormEvent } from 'react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ageRange: '',
    coverageType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission - Replace with actual API call
    try {
      // TODO: Replace with actual API endpoint
      // await fetch('/api/leads', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Lead submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        ageRange: '',
        coverageType: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      id="quote-form"
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg sm:p-8"
    >
      <h3 className="mb-6 text-2xl font-bold text-gray-900 font-heading">
        Get Your Free Quote
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700 mb-1">
            Age Range *
          </label>
          <select
            id="ageRange"
            name="ageRange"
            required
            value={formData.ageRange}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
          >
            <option value="">Select age range</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46-55">46-55</option>
            <option value="56-65">56-65</option>
            <option value="65+">65+</option>
          </select>
        </div>

        <div>
          <label htmlFor="coverageType" className="block text-sm font-medium text-gray-700 mb-1">
            Type of Coverage *
          </label>
          <select
            id="coverageType"
            name="coverageType"
            required
            value={formData.coverageType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
          >
            <option value="">Select coverage type</option>
            <option value="life">Life Insurance</option>
            <option value="family">Family Insurance</option>
            <option value="health">Health Insurance</option>
            <option value="investment">Investment-Based</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[#1e3a8a] px-6 py-4 text-lg font-semibold text-white hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? 'Submitting...' : 'See My Options'}
        </button>

        {submitStatus === 'success' && (
          <div className="rounded-lg bg-green-50 p-4 text-green-800">
            Thank you! We'll be in touch shortly with your personalized quote.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="rounded-lg bg-red-50 p-4 text-red-800">
            Something went wrong. Please try again or contact us directly.
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-500 text-center">
        By submitting this form, you agree to be contacted by The Policy Boss.
      </p>
    </form>
  );
}

