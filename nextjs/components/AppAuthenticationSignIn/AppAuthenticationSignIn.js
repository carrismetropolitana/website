'use client';

/* * */

import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import styles from './AppAuthenticationSignIn.module.css';
import { useState } from 'react';
import Loader from '@/components/Loader/Loader';
import useSWR from 'swr';
import AppAuthenticationSignInProvider from '@/components/AppAuthenticationSignInProvider/AppAuthenticationSignInProvider';
import AppAuthenticationSignInProviderEmail from '../AppAuthenticationSignInProviderEmail/AppAuthenticationSignInProviderEmail';

/* * */

export default function AppAuthenticationSignIn() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppAuthenticationSignIn');
  const [isLoading, setIsLoading] = useState(false);

  //
  // B. Fetch data

  const { data: providersData } = useSWR('/api/auth/providers');

  //
  // D. Handle actions

  const handleSignIn = async (providerId, providerPayload) => {
    setIsLoading(true);
    signIn(providerId, { ...providerPayload, callbackUrl: '/profile' });
  };

  //
  // E. Render components

  return (
    <div className={styles.container}>
      {providersData ? (
        Object.values(providersData).map((provider) => (provider.id === 'email' ? <AppAuthenticationSignInProviderEmail key={provider.id} onClick={handleSignIn} /> : <AppAuthenticationSignInProvider key={provider.id} providerId={provider.id} onClick={handleSignIn} />))
      ) : (
        <Loader visible fixed />
      )}
    </div>
  );

  //
}
