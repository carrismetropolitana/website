'use client';

/* * */

import LiveIcon from '@/components/common/LiveIcon';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesDetailMetrics');
	const linesDetailContext = useLinesDetailContext();

	//
	// B. Render components

	if (!linesDetailContext.data.line || !linesDetailContext.data.demand) {
		return null;
	}

	return (
		<Surface>
			<Section withPadding>
				<div className={styles.container}>
					<div className={styles.metricWrapper}>
						<div className={styles.bigNumberWrapper}>
							<h1 className={styles.bigNumber} style={{ color: linesDetailContext.data.line.color }}>{t('demand.big_number', { value: linesDetailContext.data.demand.total_qty })}</h1>
							<LiveIcon className={styles.liveIcon} color={linesDetailContext.data.line.color} />
						</div>
						<h3 className={styles.subtitle}>{t('demand.subtitle')}</h3>
						{/* <h3 className={styles.description}>{t('demand.description')}</h3> */}
					</div>
					<div className={styles.metricWrapper}>
						<div className={styles.bigNumberWrapper}>
							<h1 className={styles.bigNumber} style={{ color: linesDetailContext.data.line.color }}>{t('service.big_number', { value: 98.76 })}</h1>
							<LiveIcon className={styles.liveIcon} color={linesDetailContext.data.line.color} />
						</div>
						<h3 className={styles.subtitle}>{t('service.subtitle')}</h3>
						{/* <h3 className={styles.description}>{t('service.description')}</h3> */}
					</div>
				</div>
			</Section>
		</Surface>
	);

	//
}
