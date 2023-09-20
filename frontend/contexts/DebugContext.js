'use client';

import { createContext, useReducer } from 'react';

// A.
// CONTEXT

export const DebugContext = createContext({
  isDebug: false,
  toggleIsDebug: () => null,
});

// B.
// PROVIDER

export const DebugProvider = ({ children }) => {
  const [isDebug, toggleIsDebug] = useReducer((state) => !state, false);
  return <DebugContext.Provider value={{ isDebug: isDebug, toggleIsDebug: toggleIsDebug }}>{children}</DebugContext.Provider>;
};
