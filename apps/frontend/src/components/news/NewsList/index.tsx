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
								key={newsItem.id}
								id={newsItem.id}
								publishedAt={newsItem.publishedAt}
								title={newsItem.title}
								featuredImageSrc={
									{
										filename: newsItem.featured_image?.filename,
										thumbnailURL: newsItem.featured_image?.thumbnailURL,
										url: newsItem.featured_image?.url,
									}
								}
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
