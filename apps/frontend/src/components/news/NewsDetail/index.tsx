'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsDetailContent } from '@/components/news/NewsDetailContent';
import { NewsDetailHeader } from '@/components/news/NewsDetailHeader';
import { NewsDetailSidebar } from '@/components/news/NewsDetailSidebar';
import { NewsData } from '@/types/news.types';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function NewsDetail({ newsId }: { newsId: string }) {
	//

	//
	// A. Fetch Data

	const newsApiUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/news/${newsId}`;
	const { data: newsData, isLoading } = useSWR<NewsData>(newsApiUrl);

	//
	// C. Render components

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
							<NewsDetailContent data={newsData} />
							<NewsDetailSidebar newsBody={newsData.body} />
						</>
					)}
				</div>
			</Section>

		</Surface>
	);

	//
}
