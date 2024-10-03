/* * */

import { SelectOperationalDay } from '@/components/common/SelectOperationalDay';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { useStickyObserver } from '@/hooks/useStickyObserver';
import { getCssVariableValue } from '@/utils/getCssVariableValue';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function StopsDetailContentListHeader() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailContentListHeader');
	const stopsSingleContext = useStopsSingleContext();

	const headerHeight = getCssVariableValue('--size-height-header');
	const { isSticky, ref: stickyElementRef } = useStickyObserver({ top: headerHeight }, [1], { top: -1 });

	//
	// B. Render components

	return (
		<div ref={stickyElementRef} className={`${styles.container} ${isSticky ? styles.isSticky : ''}`}>

			{!isSticky && (
				<SelectOperationalDay />
			)}

			{isSticky && (
				<>
					<p className={styles.stopSummaryWrapper}>
						{t.rich('summary', {
							changeDay: chunks => <a className={styles.changeDay} href="#">{chunks}</a>,
							day_name: new Date(),
							dayName: chunks => <span className={styles.dayName}>{chunks}</span>,
							stop_name: stopsSingleContext.data.stop?.name,
							stopName: chunks => <span className={styles.stopName}>{chunks}</span>,
						})}
					</p>
				</>
			)}

			<div className={styles.tripsLegend}>
				<div className={styles.tripsLegendColumn}>{t('trips_legend.line')}</div>
				<div className={styles.tripsLegendColumn}>{t('trips_legend.headsign')}</div>
				<div className={styles.tripsLegendColumn}>{t('trips_legend.estimate')}</div>
			</div>

		</div>
	);

	//
}
