'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { BreakpointSwitch } from '@/components/responsive/BreakpointSwitch';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export function Review2025Intro() {
	return (
		<Surface forceOverflow>
			<BreakpointSwitch
				desktop={<Image alt="Review 2025" className={styles.image} src="/assets/review-2025/images/banner_web.png" />}
				mobile={<Image alt="Review 2025" className={styles.image} src="/assets/review-2025/images/banner_mobile.png" />}
			/>
		</Surface>
	);
}
