'use client';

/* * */

import type { EmblaCarouselType } from 'embla-carousel';

import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import React from 'react';

import styles from './styles.module.css';

/* * */

interface CarouselProps {
	loop?: boolean
	skeletonComponent?: React.ReactNode
	skeletonQty?: number
	slides?: SlideItemProps[]
	slideSize?: number
	subheading?: string
}

interface SlideItemProps {
	_id: string
	component: React.ReactNode
}

/* * */

export default function Component({ loop = false, skeletonComponent, skeletonQty = 3, slides = [], slideSize = 300, subheading }: CarouselProps) {
	const [embla, setEmbla] = React.useState<EmblaCarouselType | null>(null);

	const scrollPrev = React.useCallback(() => {
		if (embla) embla.scrollPrev();
	}, [embla]);

	const scrollNext = React.useCallback(() => {
		if (embla) embla.scrollNext();
	}, [embla]);

	return (
		<div className={styles.carouselContainer}>
			{(subheading || slides.length > 0) && (
				<div className={styles.header}>
					{subheading && (
						<div className={styles.subheading}>
							{subheading}
						</div>
					)}
					{slides.length > 0 && (
						<div className={styles.controlsWrapper}>
							<button
								className={styles.control}
								onClick={scrollPrev}
							>
								<IconArrowLeft size={30} />
							</button>
							<button
								className={styles.control}
								onClick={scrollNext}
							>
								<IconArrowRight size={30} />
							</button>
						</div>
					)}
				</div>
			)}
			<Carousel
				classNames={{ container: styles.container }}
				emblaOptions={{ align: 'start', dragFree: true, loop }}
				getEmblaApi={setEmbla}
				height="100%"
				plugins={[WheelGesturesPlugin()]}
				slideGap={1}
				slideSize={slideSize}
				w="100%"
				withControls={false}
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
		</div>
	);
}
