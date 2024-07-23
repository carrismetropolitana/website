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
	slideSize?: number
	slides?: SlideItemProps[]
}

interface SlideItemProps {
	_id: string
	component: React.ReactNode
}

/* * */

export default function Component({ skeletonComponent, skeletonQty = 3, slideSize = 300, slides = [] }: CarouselProps) {
	return (
		<Carousel
			align="start"
			classNames={{ container: styles.container, control: styles.control, controls: styles.controlsWrapper }}
			height="100%"
			nextControlIcon={<IconArrowRight size={20} />}
			plugins={[WheelGesturesPlugin()]}
			previousControlIcon={<IconArrowLeft size={20} />}
			slideGap={1}
			slideSize={slideSize}
			withControls={slides.length > 0}
			dragFree
			skipSnaps
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
