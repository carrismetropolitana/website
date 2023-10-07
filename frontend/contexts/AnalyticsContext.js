'use client';

import pjson from '../package.json';
import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// A.
// CREATE CONTEXT

const AnalyticsContext = createContext(null);

// B.
// SETUP CUSTOM HOOKS

export function useAnalyticsContext() {
  return useContext(AnalyticsContext);
}

// C.
// SETUP PROVIDER

export function AnalyticsContextProvider({ children }) {
  //

  //
  // A. Setup local state

  const [isCaptureEnabled, setIsCaptureEnabled] = useState(false);

  //
  // B. Retrieve authorization from local storage

  useEffect(() => {
    const savedAuthorizationStatus = localStorage.getItem('anonymous_analytics');
    setIsCaptureEnabled(savedAuthorizationStatus === 'enabled' ? true : false);
  }, []);

  //
  // C. Enable or Disable capture

  const enableCapture = useCallback(() => {
    // Set local state and save decision to local storage
    setIsCaptureEnabled(true);
    localStorage.setItem('anonymous_analytics', 'enabled');
  }, []);

  const disableCapture = useCallback(() => {
    // Set local state and clear local storage
    setIsCaptureEnabled(false);
    localStorage.clear();
  }, []);

  //
  // D. Capture events

  const captureEvent = useCallback(
    async (key, properties = {}) => {
      // Only capture anonymous analytics if user has allowed it
      if (isCaptureEnabled === true || true) {
        // Fetch all the other properties
        await fetch('https://stats.carrismetropolitana.pt/usage/website', {
          method: 'POST',
          body: JSON.stringify({
            user_ip: 'server side',
            user_agent: window.navigator.userAgent || 'unavailable',
            device_type: 'server side',
            device_os_version: 'server side',
            device_locale: 'server side',
            device_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unavailable',
            device_screen_width: document.documentElement.clientWidth || 'unavailable',
            device_screen_height: document.documentElement.clientHeight || 'unavailable',
            device_screen_orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
            device_fingerprint: await getCurrentBrowserFingerPrint(),
            app_version: pjson.version,
            referer: document.referrer || 'unavailable',
            event_key: key,
            event_properties: properties,
          }),
        });
      }
    },
    [isCaptureEnabled]
  );

  //
  // E. Setup context object

  const contextObject = useMemo(
    () => ({
      enabled: isCaptureEnabled,
      enable: enableCapture,
      disable: disableCapture,
      capture: captureEvent,
    }),
    [isCaptureEnabled, enableCapture, captureEvent, disableCapture]
  );

  //
  // F. Return provider

  return <AnalyticsContext.Provider value={contextObject}>{children}</AnalyticsContext.Provider>;

  //
}
