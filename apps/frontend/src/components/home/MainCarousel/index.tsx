'use client';

/* * */

import { Loader } from '@/components/common/Loader';
import { MainCarouselCard } from '@/components/home/MainCarouselCard';
import { HomeSliderSlide } from '@carrismetropolitana/website-shared-types';
import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useRef, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

const AUTOPLAY_DELAY = 10000; // 10 seconds

/* * */

export function MainCarousel() {
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
	// B. Fetch data

	const { data: homeSliderData } = useSWR<HomeSliderSlide[]>('admin/public-api/home-slider');

	//
	// C. Render components

	return (
		<>
			<div className={`${styles.overlay} ${isHovered ? styles.overlayIsActive : ''}`} />

			<Carousel
				classNames={{ control: styles.control, controls: styles.controlsWrapper, root: styles.root }}
				emblaOptions={{ align: 'start' }}
				height="100%"
				nextControlIcon={<IconArrowRight size={20} />}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				plugins={[WheelGesturesPlugin(), autoplay.current]}
				previousControlIcon={<IconArrowLeft size={20} />}
				slideGap={1}
				style={{ flex: 1 }}
				withControls={homeSliderData?.length > 0}
				withIndicators
			>

				{!homeSliderData && (
					<Carousel.Slide className={styles.loaderSlide}>
						<Loader />
					</Carousel.Slide>
				)}

				{homeSliderData?.length > 0 && homeSliderData.map(item => (
					<Carousel.Slide key={item._id}>
						<MainCarouselCard
							coverImageSrc={item.image_url}
							href={item.more_info_url}
							title="item.title"
						/>
					</Carousel.Slide>
				))}

			</Carousel>

		</>
	);

	//
}
