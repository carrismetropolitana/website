'use client';

/* * */

import Section from '@/components/layout/Section';
import { useLinesSingleContext } from '@/contexts/LinesSingle.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.DemandByLine');
	const linesSingleContext = useLinesSingleContext();

	//
	// B. Render components

	if (!linesSingleContext.data.line || !linesSingleContext.data.demand) {
		return (
			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
				<div className={styles.metrics}>
					<h1>0</h1>
					<h3>{t('num_passengers')}</h3>
				</div>
			</Section>
		);
	}

	return (
		<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
			<div className={styles.metrics}>
				<h1 style={{ color: linesSingleContext.data.line.color }}>{linesSingleContext.data.demand.total_qty}</h1>
				<h3>{t('num_passengers')}</h3>
			</div>
		</Section>
	);

	//
}
