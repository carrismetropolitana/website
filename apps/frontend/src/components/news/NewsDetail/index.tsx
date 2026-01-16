'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsDetailContent } from '@/components/news/NewsDetailContent';
import { NewsDetailHeader } from '@/components/news/NewsDetailHeader';
import { NewsDetailSidebar } from '@/components/news/NewsDetailSidebar';
import PayloadNews from '@/components/payload-components';
import { NewsData } from '@/types/news.types';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function NewsDetail({ newsId }) {
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

		content.querySelectorAll('h2, h3').forEach((heading, index) => {
			heading.id = `heading-${index}`;
		});

		const newData = newsData;
		newData.content = content.innerHTML;

		setData(newData);
	}, [newsData]);

	//
	// C. Render components

	return (
		<Surface>

			<Section withBottomDivider withPadding>
				<BackButton />
			</Section>

			<NewsDetailHeader newsData={newsData} />

			{/* <Section withPadding>
				<div className={styles.innerWrapper}>
					{!isLoading && data && <NewsDetailContent content={data.content} />}
					{!isLoading && data && <NewsDetailSidebar newsData={data} />}
				</div>
			</Section> */}

			<Section withPadding>
				<PayloadNews newsId={newsId} />
			</Section>

		</Surface>
	);

	//
}
