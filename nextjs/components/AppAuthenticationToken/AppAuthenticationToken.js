'use client';

/* * */

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './AppAuthenticationToken.module.css';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

/* * */

export default function AppAuthenticationToken() {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  //
  // B. Transform data

  //
  // B. Handle actions

  //   useEffect(() => {}, [router, status, searchParams]);

  useEffect(() => {
    (async function getToken() {
      try {
        if (status === 'loading') {
        } else if (status === 'authenticated') {
          const signedTokenResponse = await fetch('/api/auth/token/sign');
          const signedTokenData = await signedTokenResponse.text();
          const newUrl = `/token?token=${signedTokenData}`;
          window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
        } else {
          router.push('/login?callbackUrl=/token');
        }
      } catch (error) {}
    })();
  }, [router, searchParams, status]);

  //
  // D. Render components

  return (
    <div className={styles.container}>
      <p>The JWT token should now be in the URL. The app should look for the search parameter &quot;token&quot; and periodicaly (ex: every second) check if it has a value. When a value is found, save the token on device storage and close the webview.</p>
      <p>The JWT token is then used to authenticate requests to the API. To do so, set an HTTP header on every request:</p>
      <pre>Authorization: Bearer eyJhbGciOiJIUzI1...</pre>
      <p>If the request is denied, this means it has expired or has become invalid. When this is the case, the login screen should be presented again to retrive a new token.</p>
    </div>
  );

  //
}
