'use client';

import { useEffect } from 'react';

export default function RedirectToQuiz() {
  useEffect(() => {
    window.location.replace('/quiz');
  }, []);

  return null;
}