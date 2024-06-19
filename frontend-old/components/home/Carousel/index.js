'use client';

/* * */

import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import data from './data.json';

/* * */

export default function Component() {
	return (
		<Carousel height="100%" plugins={[WheelGesturesPlugin({ forceWheelAxis: 'x', target: document.documentElement })]} slideGap={1} style={{ flex: 1 }} loop withIndicators>
			{data.map((item, index) => (
				<Carousel.Slide key={index}>
					<Image src={item.src} />
				</Carousel.Slide>
			))}
		</Carousel>
	);
}
