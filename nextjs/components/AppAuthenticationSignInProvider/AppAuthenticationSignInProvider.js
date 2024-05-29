'use client';

/* * */

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './AppAuthenticationSignInProvider.module.css';

/* * */

export default function AppAuthenticationSignInProvider({ onClick, providerId }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('AppAuthenticationSignInProvider');

	//
	// B. Render components

	if (providerId === 'github') {
		return (
			<button className={styles.button} onClick={() => onClick(providerId)}>
				<Image alt="Google" height={45} src="/images/login-github.svg" width={225} />
			</button>
		);
	}

	if (providerId === 'google') {
		return (
			<button className={styles.button} onClick={() => onClick(providerId)}>
				<Image alt="Google" height={45} src="/images/login-google.svg" width={225} />
			</button>
		);
	}

	//
}
