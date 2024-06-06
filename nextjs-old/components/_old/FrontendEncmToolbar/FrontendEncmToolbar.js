'use client';

import FrontendEncmToolbarSearch from '@/components/FrontendEncmToolbarSearch/FrontendEncmToolbarSearch';
import { ActionIcon, SegmentedControl, Tooltip } from '@mantine/core';
import { IconArrowsMinimize, IconBrandGoogleMaps } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './FrontendEncmToolbar.module.css';

export default function FrontendEncmToolbar({ onMapRecenter, onOpenInGoogleMaps, onSelectEncmId, onSelectMapStyle, selectedEncmId, selectedMapStyle }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendEncmToolbar');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<SegmentedControl
				aria-label={t('map_style.label')}
				onChange={onSelectMapStyle}
				value={selectedMapStyle}
				data={[
					{ label: t('map_style.options.map'), value: 'map' },
					{ label: t('map_style.options.satellite'), value: 'satellite' },
				]}
			/>

			<Tooltip label={t('recenter_map.label')} position="bottom" withArrow>
				<ActionIcon aria-label={t('recenter_map.label')} color="gray" onClick={onMapRecenter} size="lg" variant="light">
					<IconArrowsMinimize size={20} />
				</ActionIcon>
			</Tooltip>

			<Tooltip label={t('open_gmaps.label')} position="bottom" withArrow>
				<ActionIcon aria-label={t('open_gmaps.label')} color="gray" onClick={onOpenInGoogleMaps} size="lg" variant="light">
					<IconBrandGoogleMaps size={20} />
				</ActionIcon>
			</Tooltip>

			<div className={styles.fullWidth}>
				<FrontendEncmToolbarSearch onSelectEncmId={onSelectEncmId} selectedEncmId={selectedEncmId} />
			</div>
		</div>
	);
}
