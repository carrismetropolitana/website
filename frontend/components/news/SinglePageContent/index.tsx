'use client';

/* * */

import Section from '@/components/layout/Section';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component({ newsData }) {
	//

	//
	// A. Setup variables

	// const t = useTranslations('news.SinglePage');

	//
	// D. Render Components

	useEffect(() => {
		// Remove unecessary Wordpress HTML
		document.querySelectorAll('.wp-block-spacer').forEach(el => el.remove());
	});

	//
	// D. Render Components

	return (
		<div className={styles.content} dangerouslySetInnerHTML={{ __html: newsData?.content }} />
	);

	//
}
