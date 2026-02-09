'use client';
/* * */

import type { NewsData } from '@/types/news.types';

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsDetailHeader } from '@/components/news/NewsDetailHeader';
import { NewsDetailSidebar } from '@/components/news/NewsDetailSidebar';
import PayloadNews from '@/components/payload';
import { useLivePreviewData } from '@/hooks/useLivePreviewData';

import styles from '../NewsDetail/styles.module.css';

/* * */

interface NewsDetailPreviewProps {
	initialData: NewsData
}

/* * */

export function NewsDetailPreview({ initialData }: NewsDetailPreviewProps) {
	const { newsData } = useLivePreviewData(initialData);

	if (!newsData) {
		return (
			<Surface>
				<Section withPadding>
					<div>Loading preview...</div>
				</Section>
			</Surface>
		);
	}

	return (
		<Surface>
			<NewsDetailHeader newsData={newsData} />

			<Section withPadding>
				<div className={styles.innerWrapper} />
			</Section>

			<Section withPadding>
				<div className={styles.innerWrapper}>
					<PayloadNews data={newsData} />
					{newsData.body && <NewsDetailSidebar newsBody={newsData.body} />}
				</div>
			</Section>
		</Surface>
	);
}
