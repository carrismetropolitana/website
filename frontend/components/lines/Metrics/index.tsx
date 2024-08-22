'use client';

/* * */

import LiveIcon from '@/components/common/LiveIcon';
import { useLinesSingleContext } from '@/contexts/LinesSingle.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.Metrics');
	const linesSingleContext = useLinesSingleContext();

	//
	// B. Render components

	if (!linesSingleContext.data.line || !linesSingleContext.data.demand) {
		return (
			<div className={styles.metrics}>
				<h1>0</h1>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.bigNumberWrapper}>
				<h1 className={styles.bigNumber} style={{ color: linesSingleContext.data.line.color }}>{t('demand.big_number', { value: linesSingleContext.data.demand.total_qty })}</h1>
				<LiveIcon className={styles.liveIcon} color={linesSingleContext.data.line.color} />
			</div>
			<h3 className={styles.subtitle}>{t('demand.subtitle')}</h3>
			{/* <h3 className={styles.description}>{t('demand.description')}</h3> */}
		</div>
	);

	//
}
