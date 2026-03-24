'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Image } from '@mantine/core';

/* * */

import styles from './styles.module.css';

export function TapAndRideHeader() {
	//

	//
	// A. Render Components

	return (
		<Section>
			{/* <div className={styles.imagesWrapper}> */}
			<Image alt="Tap and Ride" className={styles.imageMap} height={1080} src="/assets/tap-and-ride/tap_and_ride_banner.svg" width={1920} />
			{/* </div> */}
		</Section>
	);

	//
}
