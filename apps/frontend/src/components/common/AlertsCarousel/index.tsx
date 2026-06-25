/* * */

import { AlertsCarouselSlide } from '@/components/common/AlertsCarouselSlide';
import Carousel from '@/components/common/Carousel';
import { type HubAlert } from '@tmlmobilidade/types';

/* * */

interface Props {
	alerts: HubAlert[]
	target?: '_blank' | '_self'
}

/* * */

export function AlertsCarousel({ alerts, target = '_self' }: Props) {
	//

	const carouselSlides = alerts?.map(slideItem => ({
		_id: slideItem._id + slideItem.title,
		component: (
			<AlertsCarouselSlide alert={slideItem} target={target} />
		),
	}));

	return (
		<Carousel slides={carouselSlides} />
	);

	//
}
