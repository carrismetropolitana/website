'use client';

/* * */

import Carousel from '@/components/common/Carousel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsCard } from '@/components/news/NewsCard';
import { NewsCardSkeleton } from '@/components/news/NewsCardSkeleton';
import { NewsData } from '@/types/news.types';
import collator from '@/utils/collator';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

/* * */

export function NewsSection() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.NewsSection');

	//
	// B. Fetch Data

	const { data: allNewsData } = useSWR('admin/public-api/news');

	//
	// C. Transform data

	const allNewsDataLatest: NewsData[] = allNewsData?.sort((a, b) => collator.compare(b.publishedAt, a.publishedAt)).slice(0, 6);

	const carouselSlides = allNewsDataLatest?.map(slideItem => ({
		_id: slideItem.id,
		component: (
			<NewsCard
				id={slideItem.id}
				publishedAt={slideItem.publishedAt}
				slug={slideItem.slug}
				title={slideItem.title}
				featuredImageSrc={{
					filename: slideItem.featured_image?.filename,
					thumbnailURL: slideItem.featured_image?.thumbnailURL,
					url: slideItem.featured_image?.url,
				}}
			/>
		),
	}));

	//
	// D. Render components

	return (
		<Surface>
			<Section heading={t('section_heading')} href="/news">
				<Carousel skeletonComponent={<NewsCardSkeleton />} skeletonQty={4} slides={carouselSlides} />
			</Section>
		</Surface>
	);

	//
}
