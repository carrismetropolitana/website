'use client';

/* * */

import FrontendSection from '@/components/FrontendSection';
import FrontendText from '@/components/FrontendText';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component({ news_id }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendNewsPage');

	//
	// B. Fetch Data

	const { data: newsData } = useSWR(`/api/news/${news_id}`);

	//
	// D. Render Components

	return (
		<FrontendSection withTopBorder={false} withGlobalPadding>
			<h1 className={styles.title}>{newsData?.title}</h1>
			<div className={styles.content} dangerouslySetInnerHTML={{ __html: newsData?.content }} />
		</FrontendSection>
	);

	//
}
