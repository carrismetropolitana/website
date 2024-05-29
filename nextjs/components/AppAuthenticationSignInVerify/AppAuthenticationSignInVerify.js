'use client';

/* * */

import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';
import Title from '@/components/Title/Title';
import { useRouter } from '@/translations/navigation';
import { Space } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './AppAuthenticationSignInVerify.module.css';

/* * */

export default function AppAuthenticationSignInVerify() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const t = useTranslations('AppAuthenticationSignInVerify');

	//
	// B. Handle actions

	const handleSignInRetry = () => {
		router.push('/login');
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<Title level="h2" text={t('title')} />
			<Text text={t('subtitle')} />
			<Space />
			<Button label={t('retry')} onClick={handleSignInRetry} variant="muted" />
		</div>
	);

	//
}
