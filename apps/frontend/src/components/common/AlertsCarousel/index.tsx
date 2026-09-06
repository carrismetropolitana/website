/* * */

import { AlertsCarouselSlide } from '@/components/common/AlertsCarouselSlide';
import Carousel from '@/components/common/Carousel';
import { type HubV1ApiAlert } from '@tmlmobilidade/go-types-hub';

/* * */

interface Props {
	alerts: HubV1ApiAlert[]
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
