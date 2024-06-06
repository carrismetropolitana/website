'use client';

/* * */

import LayoutSection from '@/components/layout/Section';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component({ news_id }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('NewsPage');

	//
	// B. Fetch Data

	const { data: newsData } = useSWR(`/api/news/${news_id}`);

	//
	// D. Render Components

	return (
		<LayoutSection withTopBorder={false} withGlobalPadding>
			<h1 className={styles.title}>{newsData?.title}</h1>
			<div className={styles.content} dangerouslySetInnerHTML={{ __html: newsData?.content }} />
		</LayoutSection>
	);

	//
}
