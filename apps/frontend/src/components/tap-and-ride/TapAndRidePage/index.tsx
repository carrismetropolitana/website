'use client';
/* * */

import { Surface } from '@/components/layout/Surface';
import { TapAndRideContent } from '@/components/tap-and-ride/TapAndRideContent';
import { TapAndRideHeader } from '@/components/tap-and-ride/TapAndRideHeader';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function TapAndRidePage() {
	//

	//
	// A. Setup variables

	const common = useTranslations('common');

	//
	// B. Render components

	return (
		<Surface forceOverflow>
			<div className={styles.backButton}>
				<Link className={styles.container} href="/">
					<IconArrowLeft size={14} />
					<span className={styles.label}>{common('BackButton.label')}</span>
				</Link>
			</div>
			<TapAndRideHeader />
			<TapAndRideContent />
		</Surface>
	);

	//
}
