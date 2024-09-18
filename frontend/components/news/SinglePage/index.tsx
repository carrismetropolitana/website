'use client';

/* * */

import Section from '@/components/layout/Section';
import SinglePageContent from '@/components/news/SinglePageContent';
import SinglePageHeader from '@/components/news/SinglePageHeader';
import SinglePageSidebar from '@/components/news/SinglePageSidebar';
import { NewsData } from '@/types/news.types';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component({ newsId }) {
	//

	//
	// A. Fetch Data

	const { data: newsData, isLoading } = useSWR(`/api/news/${newsId}`);
	const [data, setData] = useState<NewsData>();

	//
	// B. Transform Data
	// Give a unique ID to each heading in the content to be able
	// to link to them from the sidebar
	useEffect(() => {
		if (!newsData) return;

		const content = document.createElement('div');
		content.innerHTML = newsData.content;

		content.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading, index) => {
			heading.id = `heading-${index}`;
		});

		const newData = newsData;
		newData.content = content.innerHTML;

		setData(newData);
	}, [newsData]);

	//
	// B. Render Components

	return (
		<>
			<SinglePageHeader newsData={newsData} />
			<Section childrenWrapperStyles={styles.innerWrapper} withTopPadding={false} withChildrenPadding>
				{!isLoading && data && <SinglePageContent content={data.content} />}
				{!isLoading && data && <SinglePageSidebar newsData={data} />}
			</Section>
		</>
	);

	//
}
