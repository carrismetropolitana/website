'use client';
/* * */
import { Surface } from '@/components/layout/Surface';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export function SurveyIntro() {
	return (
		<Surface forceOverflow>
			<Image alt="Review " className={styles.image} src="/assets/survey/images/AF _ Inquérito _ Banner _ Small.png" />
		</Surface>
	);
}
