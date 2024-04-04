/* * */

import { useTranslations } from 'next-intl';
import Text from '@/components/Text/Text';
import styles from './FrontendPipStops.module.css';
import { useFrontendPipContext } from '@/contexts/FrontendPipContext';
import Loader from '@/components/Loader/Loader';
import FrontendPipStopsStop from '@/components/FrontendPipStopsStop/FrontendPipStopsStop';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';

/* * */

export default function FrontendPipStops() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendPipStops');
	const frontendPipContext = useFrontendPipContext();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Text>{t('question')}</Text>
			<div className={styles.answersGrid}>{frontendPipContext.item_data ? frontendPipContext.item_data.stops?.length > 0 ? frontendPipContext.item_data.stops.map(item => <FrontendPipStopsStop key={item} stopId={item} />) : <NoDataLabel text={t('no_data')}/> : <Loader visible />}</div>
		</div>
	);

	//
}