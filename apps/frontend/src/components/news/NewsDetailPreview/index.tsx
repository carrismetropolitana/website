'use client';
/* * */

import type { NewsData } from '@/types/news.types';

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsDetailContent } from '@/components/news/NewsDetailContent';
import { NewsDetailHeader } from '@/components/news/NewsDetailHeader';
import { NewsDetailSidebar } from '@/components/news/NewsDetailSidebar';
import { useLivePreviewData } from '@/hooks/useLivePreviewData';

import styles from '../NewsDetail/styles.module.css';

/* * */

interface NewsDetailPreviewProps {
	initialData: NewsData
}

/* * */

export function NewsDetailPreview({ initialData }: NewsDetailPreviewProps) {
	const { newsData } = useLivePreviewData(initialData, 'news');

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
				<div className={styles.innerWrapper}>
					<NewsDetailContent data={newsData} />
					<NewsDetailSidebar newsBody={newsData.body} />
				</div>
			</Section>
		</Surface>
	);
}
