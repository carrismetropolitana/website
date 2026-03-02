/* * */

import { Loader } from '@/components/common/Loader';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { PipsStopDetail } from '@/components/pips-survey/PipsStopDetail';
import { usePipsContext } from '@/contexts/Pips.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function PipsStopsList() {
	//

	//
	// A. Setup variables

	const pipsContext = usePipsContext();
	const t = useTranslations('PipsSurvey.stops_list');

	//
	// B. Render components

	return (
		<Section withGap withPadding>
			<div className={styles.container}>
				<div className={styles.answersGrid}>{pipsContext.data.pipData ? pipsContext.data.pipData.stop_ids?.length > 0 ? pipsContext.data.pipData.stop_ids.map(item => <PipsStopDetail key={item} stopId={item} />) : <NoDataLabel text={t('no_data')} /> : <Loader visible />}</div>
			</div>
		</Section>
	);

	//
}
