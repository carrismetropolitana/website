'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsDetailHeader } from '@/components/news/NewsDetailHeader';
import PayloadNews from '@/components/payload-components';
import { NewsData } from '@/types/news.types';
import { Loader } from '@mantine/core';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function NewsDetail({ newsId }: { newsId: string }) {
	//

	//
	// A. Fetch Data

	const { data: newsData, isLoading } = useSWR<NewsData>(`/api/payload-news/${newsId}`);

	//
	// C. Render components

	return isLoading
		? <Loader size="lg" /> : (
			<Surface>

				<Section withBottomDivider withPadding>
					<BackButton />
				</Section>

				<NewsDetailHeader newsData={newsData} />

				<Section withPadding>
					<div className={styles.innerWrapper}>
						<PayloadNews data={newsData} />
					</div>
				</Section>

			</Surface>
		);

	//
}
