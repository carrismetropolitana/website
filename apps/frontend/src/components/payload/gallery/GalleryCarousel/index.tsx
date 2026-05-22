'use client';
/* * */

import type { ReactNode } from 'react';

import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

export interface GalleryCarouselSlide {
	_id: string
	component: ReactNode
}

interface GalleryCarouselProps {
	slides: GalleryCarouselSlide[]
}

/* * */

export function GalleryCarousel({ slides }: GalleryCarouselProps) {
	if (!slides.length) {
		return null;
	}

	return (
		<Carousel
			emblaOptions={{ align: 'center', loop: slides.length > 1 }}
			nextControlIcon={<IconArrowRight size={20} />}
			previousControlIcon={<IconArrowLeft size={20} />}
			slideGap={0}
			slideSize="100%"
			w="100%"
			withControls={slides.length > 1}
			classNames={{
				container: styles.container,
				control: styles.control,
				controls: styles.controls,
				slide: styles.slide,
			}}
		>
			{slides.map(slide => (
				<Carousel.Slide key={slide._id}>
					{slide.component}
				</Carousel.Slide>
			))}
		</Carousel>
	);
}
