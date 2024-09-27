'use client';

import TextPopover from '@/components/common/TextPopover';
import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import { IconArrowsMinimize, IconMapShare } from '@tabler/icons-react';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

export default function Component({ className }: { className?: string }) {
	//
	// A. Setup variables
	const t = useTranslations('map.toolbar');
	const mapStyles: SegmentedControlItem[] = [
		{ label: t('style.map'), value: 'map' },
		{ label: t('style.satellite'), value: 'satellite' },
	];

	//
	// C. Render component
	return (
		<div className={classNames(styles.container, className)}>
			<SegmentedControl classNames={{ label: styles.segmentedControlLabel }} data={mapStyles} onChange={undefined} value={undefined} />
			<div className={styles.button}>
				<TextPopover text={t('center_map')} textSize="md">
					<IconArrowsMinimize />
				</TextPopover>
			</div>
			<div className={styles.button}>
				<TextPopover text={t('open_google_maps')} textSize="md">
					<IconMapShare />
				</TextPopover>
			</div>
		</div>
	);
}
