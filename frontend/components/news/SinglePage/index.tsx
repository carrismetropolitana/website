'use client';

/* * */

import Section from '@/components/layout/Section';
import SinglePageContent from '@/components/news/SinglePageContent';
import SinglePageHeader from '@/components/news/SinglePageHeader';
import SinglePageSidebar from '@/components/news/SinglePageSidebar';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component({ newsId }) {
	//

	//
	// A. Fetch Data

	const { data: newsData } = useSWR(`/api/news/${newsId}`);

	//
	// B. Render Components

	return (
		<>
			<SinglePageHeader newsData={newsData} />
			<Section childrenWrapperStyles={styles.innerWrapper} withTopPadding={false} withChildrenPadding>
				<SinglePageContent newsData={newsData} />
				<SinglePageSidebar newsData={newsData} />
			</Section>
		</>
	);

	//
}
