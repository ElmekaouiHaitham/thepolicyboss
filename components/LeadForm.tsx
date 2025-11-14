'use client';

import { useState, FormEvent } from 'react';
import { useSourceTracking } from '@/contexts/SourceTrackingContext';

const US_STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export default function LeadForm() {
  const { getTrackingData } = useSourceTracking();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    residentState: '',
    budget: '',
    coverageType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Get tracking data
    const trackingData = getTrackingData();

    // Prepare submission data with tracking information
    const submissionData = {
      ...formData,
      source: trackingData.source,
      context: trackingData.context,
    };

    // Submit form to API
    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await response.json();
      console.log('Lead submitted successfully:', result);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        birthDate: '',
        residentState: '',
        budget: '',
        coverageType: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20 transition-all"
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
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20 transition-all"
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
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20 transition-all"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Birthdate *
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            required
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="residentState" className="block text-sm font-medium text-gray-700 mb-1">
            Resident State *
          </label>
          <select
            id="residentState"
            name="residentState"
            required
            value={formData.residentState}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20 transition-all"
          >
            <option value="">Select your state</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Budget *
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            required
            value={formData.budget}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20 transition-all"
            placeholder="e.g. $75 per month"
          />
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
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20 transition-all"
          >
            <option value="">Select coverage type</option>
            <option value="final-expense">Final Expense</option>
            <option value="whole-life">Whole Life</option>
            <option value="mortgage-protection">Mortgage Protection</option>
            <option value="childrens-whole-life">Children's Whole Life</option>
            <option value="indexed-universal-life">Indexed Universal Life</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[#261538] px-6 py-4 text-lg font-semibold text-white hover:bg-[#3b205d] focus:outline-none focus:ring-2 focus:ring-[#3b205d] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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

