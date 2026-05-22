'use client';

/* * */

import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import React from 'react';

import styles from './styles.module.css';

/* * */

interface CarouselProps {
	skeletonComponent?: React.ReactNode
	skeletonQty?: number
	slides?: SlideItemProps[]
	slideSize?: number | string
}

interface SlideItemProps {
	_id: string
	component: React.ReactNode
}

/* * */

export default function Component({ skeletonComponent, skeletonQty = 3, slides = [], slideSize = 300 }: CarouselProps) {
	return (
		<Carousel
			classNames={{ container: styles.container, control: styles.control, controls: styles.controlsWrapper }}
			emblaOptions={{ align: 'start', dragFree: true }}
			height="100%"
			nextControlIcon={<IconArrowRight size={20} />}
			plugins={[WheelGesturesPlugin()]}
			previousControlIcon={<IconArrowLeft size={20} />}
			slideGap={1}
			slideSize={slideSize}
			w="100%"
			withControls={slides.length > 0}
		>
			{slides.length > 0 ? slides.map(slideItem => (
				<Carousel.Slide key={slideItem._id}>
					<div className={styles.slideWrapper}>
						{slideItem.component}
					</div>
				</Carousel.Slide>
			)) : Array.from({ length: skeletonQty }).map((_, index) => (
				<Carousel.Slide key={index}>
					<div className={styles.slideWrapper}>
						{skeletonComponent}
					</div>
				</Carousel.Slide>
			))}
		</Carousel>
	);
}
