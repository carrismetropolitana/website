/* * */

import { ServicePointsFilters } from '@/components/helpdesks/ServicePointsFilters';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function ServicePoints() {
	//

	//
	// A. Setup variables

	const t = useTranslations('helpdesks.ServicePoints');

	//
	// B. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withPadding>
				<ServicePointsFilters />
				<div className={styles.servicePoints}>
					<div className={styles.map}>MAP GOES HERE</div>
					<div className={styles.brands}>Brands go here</div>
				</div>
			</Section>
		</Surface>
	);

	//
}
