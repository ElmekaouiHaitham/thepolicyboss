'use client';

import { useState, useEffect, useRef } from 'react';

export default function StoryHighlight() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const previewText = "Getting life insurance was one of the best decisions I've ever made… Every step was handled with professionalism, patience, and top-tier expertise…";
  
  const fullStory = "Getting life insurance was one of the best decisions I've ever made, and the process was nothing short of excellent from start to finish. Every step was handled with professionalism, patience, and top-tier expertise. I felt fully supported, informed, and confident in the coverage I chose.\n\nWhat impressed me most was the clear communication — every option was explained in detail, every question was answered, and I never felt rushed or pressured. Instead, I felt valued and understood. The process was smooth, quick, and tailored to my needs, giving me peace of mind knowing my loved ones are protected.\n\nIf you're looking for reliability, transparency, and true customer care, this is the standard of excellence you want when securing life insurance. I highly recommend Chanelle Jones, our friendly neighborhood Licensed Insurance Agent!!";

  const StarRating = ({ size = 'h-5 w-5' }: { size?: string }) => (
    <div className="flex text-yellow-400 gap-0.5" aria-label="5 stars">
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

  const handleReadMore = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'unset';
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        document.body.style.overflow = 'unset';
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
      // Focus the modal for accessibility
      setTimeout(() => modalRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showModal]);

  return (
    <>
      <div className="mt-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-heading mb-2">
            ❤️ Client Success Story
          </h3>
          <p className="text-gray-600 text-sm md:text-base">Real experiences from real clients</p>
        </div>
        
        {/* Enhanced Preview Card */}
        <div 
          onClick={handleReadMore}
          className="group relative rounded-3xl bg-gradient-to-br from-[#faf7ff] via-white to-[#f3ecff] p-8 md:p-10 shadow-xl border-2 border-[#e4d4ff] hover:border-[#3b205d] transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-[1.02] overflow-hidden"
        >
          {/* Decorative quote icon */}
          <div className="absolute top-6 left-6 text-[#3b205d] opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>

          <div className="relative z-10">
            {/* Profile Preview */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#3b205d] to-[#261538] flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg ring-4 ring-white/50">
                T
              </div>
              <div className="flex-1">
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 font-heading mb-1">
                  Tamara
                </h4>
                <StarRating size="h-4 w-4 md:h-5 md:w-5" />
              </div>
            </div>

            {/* Quote Text */}
            <blockquote className="text-gray-800 text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 font-medium relative pl-8">
              <span className="absolute left-0 top-0 text-4xl md:text-5xl text-[#3b205d] opacity-30 font-serif leading-none">"</span>
              <span className="relative z-10">{previewText}</span>
            </blockquote>
            
            {/* Read More Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReadMore();
              }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3b205d] to-[#261538] text-white font-semibold rounded-xl hover:from-[#261538] hover:to-[#3b205d] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group/btn"
            >
              <span>Read Tamara's Full Story</span>
              <svg
                className="w-5 h-5 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

          {/* Decorative corner accent */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-[#3b205d]/5 to-transparent rounded-tl-full"></div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-white/80"
          onClick={handleCloseModal}
        >
          <div
            ref={modalRef}
            className="bg-gradient-to-br from-white to-[#faf7ff] rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border-2 border-[#e4d4ff]"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-[#3b205d] to-[#261538] p-6 md:p-8 relative overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
              </div>
              
              <div className="relative z-10 flex items-start justify-between">
                {/* Profile section */}
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-[#261538] shadow-xl ring-4 ring-white/30">
                    T
                  </div>
                  <div>
                    <h4 id="story-modal-title" className="text-2xl font-bold text-white font-heading mb-2">
                      Tamara
                    </h4>
                    <StarRating size="h-5 w-5" />
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={handleCloseModal}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-lg"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-6 md:p-10 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="relative">
                {/* Large opening quote */}
                <div className="absolute -left-4 -top-4 text-6xl md:text-7xl text-[#3b205d] opacity-20 font-serif leading-none">
                  "
                </div>
                
                {/* Story text */}
                <div className="text-gray-800 text-lg md:text-xl leading-relaxed whitespace-pre-line relative z-10 font-medium">
                  {fullStory}
                </div>

                {/* Closing quote */}
                <div className="text-right mt-4">
                  <span className="text-4xl md:text-5xl text-[#3b205d] opacity-20 font-serif leading-none">"</span>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[#3b205d]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Verified Client Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

