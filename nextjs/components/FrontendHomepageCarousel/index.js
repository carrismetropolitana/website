'use client';

/* * */

import FrontendContentWrapper from '@/components/FrontendContentWrapper';
import FrontendHomepageCarouselSlide from '@/components/FrontendHomepageCarouselSlide';
import { Carousel } from '@mantine/carousel';
import { useEffect, useState } from 'react';

import data from './data.json';
import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const [embla, setEmbla] = useState(null);
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

	//
	// B. Transform data

	useEffect(() => {
		if (embla) {
			embla.on('scroll', () => {
				setCurrentSlideIndex(embla.selectedScrollSnap());
			});
		}
	}, [embla]);

	//
	// C. Render Components

	// return (
	// 	<FrontendContentWrapper className={styles.tempImgWrapper}>
	// 		<img className={styles.tempImg} src={data[0].src} />
	// 	</FrontendContentWrapper>
	// );

	return (
		<Carousel
			align="center"
			className={styles.container}
			getEmblaApi={setEmbla}
			height="auto"
			slideGap={1}
			slideSize={350}
			style={{ flex: 1 }}
			loop
			withIndicators
		>
			{data.map((item, index) => (
				<Carousel.Slide key={index}>
					<FrontendHomepageCarouselSlide isSelected={currentSlideIndex === index} src={item.src} />
				</Carousel.Slide>
			))}
		</Carousel>
	);

	//
}
