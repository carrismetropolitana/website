'use client';

/* * */

import { useRouter } from '@/i18n/routing';
import { JsonInput } from '@mantine/core';
import { useEffect } from 'react';
import useSWR from 'swr';

import styles from './FrontendProfile.module.css';

/* * */

export default function FrontendProfile() {
	//

	//
	// A. Setup variables

	const router = useRouter();

	//
	// B. Handle actions

	const { data: profileData, isLoading: profileLoading } = useSWR('/api/profile');

	//
	// C. Handle actions

	useEffect(() => {
		if (status !== 'loading' && status !== 'authenticated') router.push('/login');
	}, [router, status]);

	//
	// D. Render components

	return (
		<div className={styles.container}>
			<div className={styles.content}>{profileData && <JsonInput rows={10} value={JSON.stringify(profileData)} w="100%" />}</div>
			<div className={styles.logout}>
				Logout
			</div>
		</div>
	);

	//
}
