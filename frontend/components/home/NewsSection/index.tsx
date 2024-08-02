'use client';

/* * */

import Carousel from '@/components/common/Carousel';
import Section from '@/components/layout/Section';
import NewsCard from '@/components/news/Card';
import NewsCardSkeleton from '@/components/news/CardSkeleton';
import collator from '@/utils/collator';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeNewsSection');

	//
	// B. Fetch Data

	const { data: allNewsData } = useSWR('/api/news');

	//
	// C. Transform data

	const allNewsDataLatest = allNewsData?.sort((a, b) => collator.compare(b.publish_date, a.publish_date)).slice(0, 5);

	const carouselSlides = allNewsDataLatest?.map(slideItem => ({
		_id: slideItem._id,
		component: (
			<NewsCard
				_id={slideItem._id}
				coverImageSrc={slideItem.cover_image_src}
				publishDate={slideItem.publish_date}
				title={slideItem.title}
			/>
		),
	}));

	//
	// D. Render Components

	return (
		<Section heading={t('section_heading')}>
			<Carousel skeletonComponent={<NewsCardSkeleton />} skeletonQty={4} slides={carouselSlides} />
		</Section>
	);

	//
}
