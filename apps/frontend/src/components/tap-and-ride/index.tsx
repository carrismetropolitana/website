'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { TapAndRideHeader } from '@/components/tap-and-ride/tapAndRideHeader';
import { TapAndRideSection1 } from '@/components/tap-and-ride/tapAndRideSection1';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function TapAndRide() {
	//

	//
	// A. Setup variables

	const commonT = useTranslations('common');

	//
	// B. Render components

	return (
		<Surface forceOverflow>
			<div className={styles.backButton}>
				<Link className={styles.container} href="/">
					<IconArrowLeft size={14} />
					<span className={styles.label}>{commonT('BackButton.label')}</span>
				</Link>
			</div>
			<TapAndRideHeader />
			<TapAndRideSection1 />
		</Surface>
	);

	//
}
