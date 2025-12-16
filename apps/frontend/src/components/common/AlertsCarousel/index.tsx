/* * */

import { AlertsCarouselSlide } from '@/components/common/AlertsCarouselSlide';
import Carousel from '@/components/common/Carousel';
import { type SimplifiedAlert } from '@/types/alerts.types';

/* * */

interface Props {
	alerts: SimplifiedAlert[]
	target?: '_blank' | '_self'
}

/* * */

export function AlertsCarousel({ alerts, target = '_self' }: Props) {
	//

	const carouselSlides = alerts?.map(slideItem => ({
		_id: slideItem.alert_id + slideItem.description,
		component: (
			<AlertsCarouselSlide alert={slideItem} target={target} />
		),
	}));

	return (
		<Carousel slides={carouselSlides} />
	);

	//
}
