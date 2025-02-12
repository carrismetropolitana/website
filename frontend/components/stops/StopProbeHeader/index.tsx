/* * */

import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from '../StopProbeSection/styles.module.css';

/* * */

interface Props {
	description?: string
	handleOptOut: () => void
	handleParticipation: () => void
	title: string
}

export function StopProbeHeader({ description, handleOptOut, handleParticipation, title }: Props) {
	//

	//
	// A. Setup Variables

	const t = useTranslations('stops.Probe');

	//
	// B. Render Components

	return (
		<div className={styles.probeHeaderContainer}>
			<div className={styles.probeHeaderDetails}>
				<p className={styles.probeTitle}>{title}</p>
				<p className={styles.probeDescription}>{description}</p>
			</div>
			<div className={styles.actionButton}>
				<Button onClick={handleParticipation}>{t('optin')}</Button>
				<Button onClick={handleOptOut}>{t('optout')}</Button>
			</div>
		</div>
	);
	//
}
