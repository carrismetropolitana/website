'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { VehiclesListDetails } from '@/components/vehicles/VehiclesListDetails';
import { VehiclesListMap } from '@/components/vehicles/VehiclesListMap';
import { VehiclesListToolbar } from '@/components/vehicles/VehiclesListToolbar';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function VehiclesList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesList');

	//
	// B. Render components

	return (
		<>

			<Surface>
				<Section heading={t('heading')} subheading={t('subheading')} />
			</Surface>

			<Surface>
				<Section>
					<div className={styles.container}>
						<div className={styles.mapWrapper}>
							<VehiclesListMap />
						</div>
						<div>
							<VehiclesListToolbar />
							<VehiclesListDetails />
						</div>
					</div>
				</Section>
			</Surface>

		</>
	);

	//
}
