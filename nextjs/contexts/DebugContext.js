'use client';

/* * */

import { createContext, useContext, useReducer } from 'react';

// A.
// CONTEXT

const DebugContext = createContext({
  isDebug: false,
  toggleIsDebug: () => null,
});

// B.
// SETUP CUSTOM HOOKS

export function useDebugContext() {
  return useContext(DebugContext);
}

// C.
// PROVIDER

export const DebugContextProvider = ({ children }) => {
  const [isDebug, toggleIsDebug] = useReducer(state => !state, false);
  return <DebugContext.Provider value={{ isDebug: isDebug, toggleIsDebug: toggleIsDebug }}>{children}</DebugContext.Provider>;
}
