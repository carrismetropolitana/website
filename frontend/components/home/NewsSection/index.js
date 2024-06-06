'use client';

/* * */

import LayoutSection from '@/components/layout/Section';
import NewsCard from '@/components/news/Card';
import NewsCardSkeleton from '@/components/news/CardSkeleton';
import collator from '@/utils/collator';
import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

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

	//
	// D. Render Components

	return (

		<LayoutSection heading={t('section_heading')}>
			<Carousel
				align="start"
				classNames={{ container: styles.carouselContainer, control: styles.carouselControl, controls: styles.carouselControlsWrapper }}
				height="100%"
				nextControlIcon={<IconArrowRight size={20} />}
				plugins={[WheelGesturesPlugin()]}
				previousControlIcon={<IconArrowLeft size={20} />}
				slideGap={1}
				withControls={!!allNewsDataLatest}
				dragFree
				skipSnaps
			>
				{allNewsDataLatest ? allNewsDataLatest.map((item, index) => (
					<Carousel.Slide key={index}>
						<div className={styles.slideWrapper}>
							<NewsCard _id={item._id} coverImageSrc={item.cover_image_src} publishDate={item.publish_date} title={item.title} />
						</div>
					</Carousel.Slide>
				)) : (
					<>
						<Carousel.Slide>
							<div className={styles.slideWrapper}>
								<NewsCardSkeleton />
							</div>
						</Carousel.Slide>
						<Carousel.Slide>
							<div className={styles.slideWrapper}>
								<NewsCardSkeleton />
							</div>
						</Carousel.Slide>
						<Carousel.Slide>
							<div className={styles.slideWrapper}>
								<NewsCardSkeleton />
							</div>
						</Carousel.Slide>
						<Carousel.Slide>
							<div className={styles.slideWrapper}>
								<NewsCardSkeleton />
							</div>
						</Carousel.Slide>
					</>
				)}
			</Carousel>
		</LayoutSection>
	);

	//
}
