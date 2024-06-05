/* * */

import FrontendVehiclesLive from '@/components/FrontendVehiclesLive/FrontendVehiclesLive';
import FrontendVehiclesSummaryRow from '@/components/FrontendVehiclesSummaryRow/FrontendVehiclesSummaryRow';
import { useTranslations } from 'next-intl';

import styles from './FrontendVehiclesSummary.module.css';

/* * */

export default function FrontendVehiclesSummary() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendVehiclesSummary');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.intro}>{t('intro')}</div>
			<FrontendVehiclesSummaryRow />
			<FrontendVehiclesSummaryRow mirrored />
			<FrontendVehiclesSummaryRow />
			<FrontendVehiclesSummaryRow mirrored />
			<FrontendVehiclesSummaryRow />
			<FrontendVehiclesLive />
		</div>
	);

	//
}
