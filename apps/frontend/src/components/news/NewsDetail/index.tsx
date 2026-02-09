'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsDetailHeader } from '@/components/news/NewsDetailHeader';
import { NewsDetailSidebar } from '@/components/news/NewsDetailSidebar';
import PayloadNews from '@/components/payload';
import { NewsData } from '@/types/news.types';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function NewsDetail({ newsId }: { newsId: string }) {
	//

	//
	// A. Fetch Data

	const { data: newsData, isLoading } = useSWR<NewsData>(`/api/news/${newsId}`);

	//
	// C. Render components

	if (isLoading) {
		return <></>;
	}

	return (
		<Surface>

			<Section withBottomDivider withPadding>
				<BackButton />
			</Section>

			<NewsDetailHeader newsData={newsData} />

			<Section withPadding>
				<div className={styles.innerWrapper}>
					{!isLoading && newsData && (
						<>
							<PayloadNews data={newsData} />
							{newsData.body && <NewsDetailSidebar newsBody={newsData.body} />}
						</>
					)}
				</div>
			</Section>

		</Surface>
	);

	//
}
