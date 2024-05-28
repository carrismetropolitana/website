'use client';

/* * */

import { useRouter } from '@/translations/navigation'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

/* * */

export default function AppAuthenticationLoginWrapper({ children }) {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  //
  // B. Handle actions

  useEffect(() => {
    if (status === 'authenticated') {
      const callbackUrl = searchParams.get('callbackUrl');
      if (callbackUrl) router.push(callbackUrl);
      else router.push('/profile');
    }
  }, [router, status, searchParams]);

  //
  // C. Render components

  return children;

  //
}
