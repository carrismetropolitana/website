'use client';

/* * */

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './FrontendEncmInfo.module.css';

/* * */

export default function FrontendEncmInfo() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendEncmInfo');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Image priority src='/images/encm-header.svg' alt={'Espaços navegante Carris Metropolitana'} width={290} height={110} />
			<p className={styles.message}>{t('message')}</p>
		</div>
	);

	//
}