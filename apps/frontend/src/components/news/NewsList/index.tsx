'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { Grid } from '@/components/layout/Grid';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsCard } from '@/components/news/NewsCard';
import { NewsCardSkeleton } from '@/components/news/NewsCardSkeleton';
import { NewsListToolbar } from '@/components/news/NewsListToolbar';
import { useNewsListContext } from '@/contexts/NewsList.context';
import { useTranslations } from 'next-intl';

import PayloadFullDemo from './PayloadDemo';

/* * */

export function NewsList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('news.NewsList');
	const newsListContext = useNewsListContext();

	//
	// B. Render components

	return (
		<Surface>

			<Section withBottomDivider withPadding>
				<BackButton href="/" />
			</Section>

			<Section withPadding>
				<PayloadFullDemo newsId="682479b26cd7b7e99ba4bf6e" />

			</Section>

			<Section heading={t('heading')} withBottomDivider withGap withPadding>
				<NewsListToolbar />
			</Section>

			{newsListContext.flags.is_loading && (
				<Section withPadding>
					<Grid columns="abcd" withGap>
						{Array(16).fill(null).map((_, index) =>
							<NewsCardSkeleton key={index} />,
						)}
					</Grid>
				</Section>
			)}

			{!newsListContext.flags.is_loading && newsListContext.data.filtered.length > 0 && (
				<Section withPadding>
					<Grid columns="abcd" withGap>
						{newsListContext.data.filtered.map(newsItem => (
							<NewsCard
								key={newsItem._id}
								_id={newsItem._id}
								coverImageSrc={newsItem.cover_image_src}
								publishDate={newsItem.publish_date}
								title={newsItem.title}
							/>
						))}
					</Grid>
				</Section>
			)}

			{!newsListContext.flags.is_loading && newsListContext.data.filtered.length === 0 && (
				<Section withPadding>
					<Grid columns="a" withGap>
						<NoDataLabel fill />
					</Grid>
				</Section>
			)}
		</Surface>
	);

	//
}
