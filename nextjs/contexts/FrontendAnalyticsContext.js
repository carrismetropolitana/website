'use client';

/* * */

import pjson from '../package.json';
import { UAParser } from 'ua-parser-js';
import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import parseDateToString from '@/services/parseDateToString';
import parseStringToDate from '@/services/parseStringToDate';

/* * */

// 1.
// DEFAULT OPTIONS

const LOCAL_STORAGE_ENABLED_KEY = 'anonymous_analytics_enabled';
const LOCAL_STORAGE_VALIDITY_IN_DAYS = 365; // days

/* * */

// A.
// CREATE CONTEXT

const AnalyticsContext = createContext(null);

/* * */

// B.
// SETUP CUSTOM HOOKS

export function useAnalyticsContext() {
  return useContext(AnalyticsContext);
}

/* * */

// C.
// SETUP PROVIDER

export function AnalyticsContextProvider({ children }) {
  //

  //
  // A. Setup local state

  const [isCaptureEnabled, setIsCaptureEnabled] = useState();

  //
  // B. Retrieve authorization from local storage

  useEffect(() => {
    // Retrieve authorization value from local storage
    const savedAuthorizationString = localStorage.getItem(LOCAL_STORAGE_ENABLED_KEY);
    // If no authorization is found then disable capture and exit
    if (!savedAuthorizationString) {
      setIsCaptureEnabled(false);
      return;
    }
    // If an authorization value is found then check if it is still valid
    const savedAuthorizationDate = parseStringToDate(savedAuthorizationString);
    const maximumValidAuthorizationDate = new Date().setDate(new Date().getDate() - LOCAL_STORAGE_VALIDITY_IN_DAYS);
    const isAuthorizationStillValid = savedAuthorizationDate > maximumValidAuthorizationDate;
    // If an authorization value is found then check if it is still valid
    setIsCaptureEnabled(isAuthorizationStillValid ? true : false);
    //
  }, []);

  //
  // C. Enable or Disable capture

  const enableCapture = useCallback(() => {
    // Set local state and save decision to local storage
    setIsCaptureEnabled(true);
    localStorage.setItem(LOCAL_STORAGE_ENABLED_KEY, parseDateToString(new Date()));
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
      try {
        // Only capture anonymous analytics if user has allowed it
        return;
        if (!isCaptureEnabled) return;
        // Parse user-agent string
        const parsedUserAgent = window.navigator.userAgent ? new UAParser(window.navigator.userAgent).getResult() : null;
        // Fetch all the other properties
        await fetch('https://stats.carrismetropolitana.pt/collector/usage/website', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            //
            app_version: pjson.version,
            //
            referer: document.referrer,
            //
            fingerprint: await getCurrentBrowserFingerPrint(),
            //
            ua: parsedUserAgent?.ua,
            ua_browser_name: parsedUserAgent?.browser?.name,
            ua_browser_version: parsedUserAgent?.browser?.version,
            ua_engine_name: parsedUserAgent?.engine?.name,
            ua_engine_version: parsedUserAgent?.engine?.version,
            ua_os_name: parsedUserAgent?.os?.name,
            ua_os_version: parsedUserAgent?.os?.version,
            ua_device_model: parsedUserAgent?.device?.model,
            ua_device_type: parsedUserAgent?.device?.type,
            ua_device_vendor: parsedUserAgent?.device?.vendor,
            ua_cpu_architecture: parsedUserAgent?.cpu?.architecture,
            //
            device_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            device_screen_width: document.documentElement.clientWidth,
            device_screen_height: document.documentElement.clientHeight,
            device_screen_orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
            device_locale: navigator.language,
            //
            ip_address: null, // Server side
            //
            event_key: key,
            event_properties: properties,
            //
          }),
        });
      } catch (error) {
        console.log(error);
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
