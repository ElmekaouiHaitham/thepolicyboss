'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SourceTrackingData {
  source: string | null;
  context: string | null;
}

interface SourceTrackingContextType {
  trackingData: SourceTrackingData;
  updateContext: (context: string) => void;
  getTrackingData: () => SourceTrackingData;
}

const SourceTrackingContext = createContext<SourceTrackingContextType | undefined>(undefined);

const STORAGE_KEY = 'thepolicyboss_source_tracking';

export function SourceTrackingProvider({ children }: { children: ReactNode }) {
  const [trackingData, setTrackingData] = useState<SourceTrackingData>({
    source: null,
    context: null,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize tracking data from URL params and sessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isInitialized) return; // Only initialize once

    // Check if we already have tracking data in sessionStorage
    const stored = sessionStorage.getItem(STORAGE_KEY);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTrackingData(parsed);
        setIsInitialized(true);
        return; // Don't overwrite existing tracking data
      } catch (e) {
        // If parsing fails, continue with fresh capture
        console.error('Failed to parse stored tracking data:', e);
      }
    }

    // Capture new tracking data from URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get source parameter (can be from 'source' or 'channel' or 'utm_source')
    const sourceParam = urlParams.get('source') || urlParams.get('channel') || urlParams.get('utm_source');
    
    // Get context parameter (can be from 'context' or 'notes')
    const contextParam = urlParams.get('context') || urlParams.get('notes');
    
    // Determine source
    let source: string | null = null;
    
    if (sourceParam) {
      source = sourceParam;
    } else {
      // Try to detect from referrer
      const referrer = document.referrer;
      if (referrer) {
        try {
          const referrerUrl = new URL(referrer);
          const hostname = referrerUrl.hostname.toLowerCase();
          
          // Detect common sources
          if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
            source = 'facebook';
          } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
            source = 'twitter';
          } else if (hostname.includes('instagram.com')) {
            source = 'instagram';
          } else if (hostname.includes('linkedin.com')) {
            source = 'linkedin';
          } else if (hostname.includes('reddit.com')) {
            source = 'reddit';
          } else if (hostname.includes('google.com') || hostname.includes('google.')) {
            source = 'google';
          } else if (hostname.includes('bing.com')) {
            source = 'bing';
          } else {
            source = hostname;
          }
        } catch (e) {
          source = referrer;
        }
      } else {
        source = 'direct';
      }
    }

    const newTrackingData: SourceTrackingData = {
      source: source || 'direct',
      context: contextParam || null,
    };

    setTrackingData(newTrackingData);
    setIsInitialized(true);
    
    // Store in sessionStorage for persistence across navigation
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newTrackingData));
    } catch (e) {
      console.error('Failed to store tracking data:', e);
    }
  }, [isInitialized]);

  // Update context
  const updateContext = (context: string) => {
    const updated = {
      ...trackingData,
      context: context || trackingData.context,
    };
    setTrackingData(updated);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update tracking data:', e);
    }
  };

  // Get current tracking data
  const getTrackingData = (): SourceTrackingData => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return parsed;
        }
      } catch (e) {
        console.error('Failed to get tracking data from storage:', e);
      }
    }
    return trackingData;
  };

  return (
    <SourceTrackingContext.Provider
      value={{
        trackingData,
        updateContext,
        getTrackingData,
      }}
    >
      {children}
    </SourceTrackingContext.Provider>
  );
}

export function useSourceTracking() {
  const context = useContext(SourceTrackingContext);
  if (context === undefined) {
    throw new Error('useSourceTracking must be used within a SourceTrackingProvider');
  }
  return context;
}
