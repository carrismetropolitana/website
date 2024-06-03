'use client';

/* * */

import FrontendGridNav from '@/components/FrontendGridNav';
import FrontendNewsCard from '@/components/FrontendNewsCard';
import FrontendSection from '@/components/FrontendSection';
import { Carousel } from '@mantine/carousel';
import { IconAlertTriangle, IconArrowLeft, IconArrowLoopRight, IconArrowRight, IconBusStop, IconSignRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import data from './data.json';
import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendHomepageNews');

	//
	// C. Render Components

	return (
		<FrontendSection heading={t('section_heading')}>
			<Carousel
				align="start"
				classNames={{ control: styles.carouselControl, controls: styles.carouselControlsWrapper }}
				height="100%"
				nextControlIcon={<IconArrowRight size={20} />}
				previousControlIcon={<IconArrowLeft size={20} />}
				slideGap={1}
				slideSize={360}
				dragFree
				withIndicators
			>
				{data.map((item, index) => (
					<Carousel.Slide key={index}>
						<div className={styles.slideWrapper}>
							<FrontendNewsCard coverImageSrc={item.src} publishDate={item.date} title={item.title} />
						</div>
					</Carousel.Slide>
				))}
			</Carousel>
		</FrontendSection>
	);

	//
}
