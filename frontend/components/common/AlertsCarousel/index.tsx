/* * */

import type { SimplifiedAlert } from '@/types/alerts.types';

import AlertsCarouselSlide from '@/components/common/AlertsCarouselSlide';
import Carousel from '@/components/common/Carousel';
import { Section } from '@/components/layout/Section';
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

	const t = useTranslations('AlertsCarousel');

	//
	// B. Render components

	const carouselSlides = alerts?.map(slideItem => ({
		_id: slideItem.alert_id + slideItem.description,
		component: (
			<AlertsCarouselSlide alert={slideItem} />
		),
	}));

	return (
		<Section withGap>
			<div className={styles.headingWrapper}>
				<IconBellRingingFilled size={20} />
				{t('heading')}
			</div>
			<Carousel slides={carouselSlides} />
		</Section>
	);

	//
}
