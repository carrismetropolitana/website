'use client';

/* * */

import AppAuthenticationSignInProvider from '@/components/AppAuthenticationSignInProvider/AppAuthenticationSignInProvider';
import AppAuthenticationSignInProviderEmail from '@/components/AppAuthenticationSignInProviderEmail/AppAuthenticationSignInProviderEmail';
import Loader from '@/components/Loader/Loader';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useSWR from 'swr';

import styles from './AppAuthenticationLogin.module.css';

/* * */

export default function AppAuthenticationLogin() {
	//

	//
	// A. Setup variables

	const t = useTranslations('AppAuthenticationSignIn');
	const searchParams = useSearchParams();

	const [isLoading, setIsLoading] = useState(false);

	//
	// B. Fetch data

	const { data: providersData } = useSWR('/api/auth/providers');

	//
	// D. Handle actions

	const handleSignIn = async (providerId, providerPayload) => {
		setIsLoading(true);
		let callbackUrl = searchParams.get('callbackUrl');
		const shouldReturnJwt = searchParams.get('returnToken');
		if (shouldReturnJwt === 'true') callbackUrl = '/profile/token';
		signIn(providerId, { ...providerPayload, callbackUrl: callbackUrl || '/profile' });
	};

	//
	// E. Render components

	return (
		<div className={styles.container}>
			{(isLoading || !providersData) && <Loader fixed visible />}
			{providersData && Object.values(providersData).map(provider => provider.id === 'email' ? <AppAuthenticationSignInProviderEmail key={provider.id} onClick={handleSignIn} /> : <AppAuthenticationSignInProvider key={provider.id} onClick={handleSignIn} providerId={provider.id} />)}
		</div>
	);

	//
}
