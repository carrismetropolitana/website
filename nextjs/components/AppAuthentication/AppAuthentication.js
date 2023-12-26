'use client';

/* * */

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/translations/navigation';
import styles from './AppAuthentication.module.css';
import Loader from '@/components/Loader/Loader';

/* * */

export default function AppAuthentication({ children }) {
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

  return (
    <div className={styles.container}>
      {(status === 'loading' || status === 'authenticated') && <Loader visible fixed />}
      <div className={styles.content}>{children}</div>
    </div>
  );

  //
}
