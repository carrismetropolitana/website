'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendLinesContentHeader.module.css';
import { LineBadge } from '@/components/LineDisplay/LineDisplay';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import FrontendLinesContentSelectPattern from '@/components/FrontendLinesContentSelectPattern/FrontendLinesContentSelectPattern';

/* * */

export default function FrontendLinesContentHeader() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendLinesContentHeader');

	const FrontendLinesContext = useFrontendLinesContext();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<LineBadge short_name={FrontendLinesContext.entities.line.short_name} color={FrontendLinesContext.entities.line.color} text_color={FrontendLinesContext.entities.line.text_color} size='lg' />
			<p className={styles.destinationLabel}>{t('destination_label')}</p>
			<FrontendLinesContentSelectPattern />
		</div>
	);

	//
}