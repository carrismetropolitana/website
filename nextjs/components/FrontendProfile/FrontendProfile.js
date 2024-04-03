'use client';

/* * */

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from '@/translations/navigation';
import styles from './FrontendProfile.module.css';
import useSWR from 'swr';
import { JsonInput } from '@mantine/core';

/* * */

export default function FrontendProfile() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const { status } = useSession();

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
			<div className={styles.content}>{profileData && <JsonInput value={JSON.stringify(profileData)} w='100%' rows={10} />}</div>
			<div onClick={signOut} className={styles.logout}>
        Logout
			</div>
		</div>
	);

	//
}