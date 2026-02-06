'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const t = useTranslations('profile.sync');
	const [seconds, setSeconds] = useState(5);

	//
	// B. Transform data

	useEffect(() => {
		const interval = setInterval(() => {
			// Redirect after 5 seconds
			if (seconds === 0) {
				clearInterval(interval);
				router.replace('/');
			}
			// Decrement seconds
			if (seconds > 0) setSeconds(seconds - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [seconds]);

	//
	// C. Render components

	return (
		<Section>
			<div className={`${styles.container} ${styles.pb_20}`}>
				<h3 className={styles.title}>{t('success')}</h3>
				<p>error: {seconds}</p>
			</div>
		</Section>
	);

	//
}
