'use client';

/* * */

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './AppAuthenticationSignInProvider.module.css';

/* * */

export default function AppAuthenticationSignInProvider({ providerId, onClick }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('AppAuthenticationSignInProvider');

	//
	// B. Render components

	if (providerId === 'github') {
		return (
			<button className={styles.button} onClick={() => onClick(providerId)}>
				<Image src='/images/login-github.svg' alt='Google' width={225} height={45} />
			</button>
		);
	}

	if (providerId === 'google') {
		return (
			<button className={styles.button} onClick={() => onClick(providerId)}>
				<Image src='/images/login-google.svg' alt='Google' width={225} height={45} />
			</button>
		);
	}

	//
}