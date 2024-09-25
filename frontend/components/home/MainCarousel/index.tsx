'use client';

/* * */

import MainCarouselCard from '@/components/home/MainCarouselCard';
import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useRef, useState } from 'react';

import slidesData from './data.json';
import styles from './styles.module.css';

/* * */

const AUTOPLAY_DELAY = 1000; // 10 seconds

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const [isHovered, setIsHovered] = useState(false);

	const autoplay = useRef(Autoplay({
		delay: AUTOPLAY_DELAY,
		playOnInit: true,
		stopOnInteraction: true,
		stopOnMouseEnter: true,
	}));

	//
	// B. Render Components

	return (
		<>
			<div className={`${styles.overlay} ${isHovered ? styles.overlayIsActive : ''}`} />
			<Carousel
				align="start"
				classNames={{ control: styles.control, controls: styles.controlsWrapper, root: styles.root }}
				height="100%"
				nextControlIcon={<IconArrowRight size={20} />}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				plugins={[WheelGesturesPlugin(), autoplay.current]}
				previousControlIcon={<IconArrowLeft size={20} />}
				slideGap={1}
				style={{ flex: 1 }}
				withControls={slidesData.length > 0}
				withIndicators
			>
				{slidesData.map(item => (
					<Carousel.Slide key={item.id}>
						<MainCarouselCard
							coverImageSrc={item.src}
							href={item.url}
							target={item.target}
							title="item.title"
						/>
					</Carousel.Slide>
				))}
			</Carousel>
		</>
	);

	//
}
