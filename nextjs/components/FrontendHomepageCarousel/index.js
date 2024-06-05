'use client';

/* * */

import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

import data from './data.json';
// import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<Carousel height="100%" slideGap={1} style={{ flex: 1 }} loop withIndicators>
			{data.map((item, index) => (
				<Carousel.Slide key={index}>
					<Image src={item.src} />
				</Carousel.Slide>
			))}
		</Carousel>
	);
}
