'use client';

/* * */

import { FleetListToolbar } from '@/components/fleet/FleetListToolbar';
import { FleetListView } from '@/components/fleet/FleetListView';
import { FleetMetrics } from '@/components/fleet/FleetMetrics';
import { GridNav } from '@/components/layout/GridNav';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { URLS } from '@/settings/urls.settings';
import { IconCode, IconDownload, IconMap, IconMessageReport } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

export function FleetPage() {
	const t = useTranslations('fleet.FleetPage');

	const FLEET_LINKS = [
		{ _id: 'issues', description: t('links.issues_description'), href: URLS.repos.datasets + '/issues', icon: <IconMessageReport />, label: t('links.issues') },
		{ _id: 'download_metadata', description: t('links.download_metadata_description'), href: URLS.repos.datasets + '/blob/latest/vehicles/vehicles.csv', icon: <IconDownload />, label: t('links.download_metadata') },
		{ _id: 'use_api', description: t('links.use_api_description'), href: URLS.repos.api + '?tab=readme-ov-file#vehicles', icon: <IconCode />, label: t('links.use_api') },
		{ _id: 'view_map', description: t('links.view_map_description'), href: '/vehicles', icon: <IconMap />, label: t('links.view_map') },
	];

	return (
		<>
			<Surface>
				<Section heading={t('heading')} subheading={t('subheading')}>
					<GridNav className={styles.gridNavOverride} items={FLEET_LINKS} />
				</Section>
			</Surface>
			<FleetMetrics />
			<FleetListToolbar />
			<FleetListView />
		</>
	);
}
