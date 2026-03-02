/* * */

import { Loader } from '@/components/common/Loader';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import PipsStopDetail from '@/components/pips-survey/PipsStopDetail';
import { usePipsContext } from '@/contexts/Pips.context';
import { useTranslations } from 'next-intl';

import styles from './FrontendPipStops.module.css';

/* * */

export default function FrontendPipStops() {
	//

	//
	// A. Setup variables

	const pipsContext = usePipsContext();
	const t = useTranslations('PipsStopsList');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<p>{t('question')}</p>
			<div className={styles.answersGrid}>{pipsContext.data.pipData ? pipsContext.data.pipData.stop_ids?.length > 0 ? pipsContext.data.pipData.stop_ids.map(item => <PipsStopDetail key={item} stopId={item} />) : <NoDataLabel text={t('no_data')} /> : <Loader visible />}</div>
		</div>
	);

	//
}
