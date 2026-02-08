'use client';

/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useFleetListContext } from '@/contexts/FleetList.context';
import { useTranslations } from 'next-intl';

import { FleetListTable } from '../FleetListTable';

/* * */

export function FleetListView() {
	const fleetListContext = useFleetListContext();
	const t = useTranslations('fleet.FleetTable');

	if (!fleetListContext.data.filtered.length) {
		return (
			<Surface variant="persistent" forceOverflow>
				<Section>
					<NoDataLabel text={t('no_data')} withMinHeight />
				</Section>
			</Surface>
		);
	}

	return (
		<Surface variant="persistent" forceOverflow>
			<Section>
				<FleetListTable />
			</Section>
		</Surface>
	);
}
