/* * */

import type { SimplifiedAlert } from '@/types/alerts.types';

import Carousel from '@/components/common/Carousel';
import Section from '@/components/layout/Section';
import AlertsCarouselSlide from '@/components/stops/AlertsCarouselSlide';
import { IconBellRingingFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	alerts: SimplifiedAlert[]
}

/* * */

export default function Component({ alerts }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.AlertsCarousel');

	//
	// B. Render components

	const carouselSlides = alerts?.map(slideItem => ({
		_id: slideItem._id,
		component: (
			<AlertsCarouselSlide alert={slideItem} />
		),
	}));

	return (
		<Section childrenWrapperStyles={styles.container} withGap={false} withTopPadding={false}>
			<div className={styles.headingWrapper}>
				<IconBellRingingFilled size={20} />
				{t('heading')}
			</div>
			<Carousel slides={carouselSlides} />
		</Section>
	);

	//
}
