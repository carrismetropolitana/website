'use client';

/* * */

import TextPopover from '@/components/common/TextPopover';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { useMapOptionsContext } from '@/contexts/MapOptions.context';
import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import { IconArrowsMinimize, IconMapShare, IconZoomScan } from '@tabler/icons-react';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	autoZoom?: boolean
	className?: string
	onCenterMap?: () => void
	showCenterButton?: boolean
	toolbarExtras?: React.ReactNode
}

/* * */

export function MapViewToolbar({ autoZoom, className, onCenterMap, showCenterButton = false, toolbarExtras }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('map.toolbar');

	const mapOptionsContext = useMapOptionsContext();
	const analyticsContext = useAnalyticsContext();

	const mapStyles: SegmentedControlItem[] = [
		{ label: t('style.map'), value: 'map' },
		{ label: t('style.satellite'), value: 'satellite' },
	];

	//
	// B. Handle actions

	const handleOpenInGoogle = () => {
		const map = mapOptionsContext.data.map;
		const clickedFrom: string = window.location.pathname;
		let clickSource: string;
		if (!map) return;

		const center = map.getCenter();
		window.open(`https://www.google.com/maps?q=${center.lat},${center.lng}&z=${map.getZoom() + 2}`, '_blank');

		if (clickedFrom.includes('lines')) {
			clickSource = 'Line_Details_Page';
			const line_id = clickedFrom.split('/')[2];
			analyticsContext.actions.capture(ampli => ampli.openGoogleMapsClicked({ click: 'true', click_from: `${clickSource}_${line_id}` }));
		}
		if (clickedFrom.includes('vehicles')) {
			clickSource = 'Vehicle_Page';
			analyticsContext.actions.capture(ampli => ampli.openGoogleMapsClicked({ click: 'true', click_from: clickSource }));
		}
		if (clickedFrom.includes('stops')) {
			clickSource = 'Stops_Page';
			const stop_id = clickedFrom.split('/')[2];
			analyticsContext.actions.capture(ampli => ampli.openGoogleMapsClicked({ click: 'true', click_from: `${clickSource}_${stop_id}` }));
		}
		if (clickedFrom.includes('stores')) {
			clickSource = 'Stores_Page';
			analyticsContext.actions.capture(ampli => ampli.openGoogleMapsClicked({ click: 'true', click_from: 'stores' }));
		}
	};

	//
	// C. Render components

	return (
		<div className={classNames(styles.container, className)}>
			<div className={styles.left}>
				<SegmentedControl classNames={{ label: styles.segmentedControlLabel }} data={mapStyles} onChange={mapOptionsContext.actions.setStyle} value={mapOptionsContext.data.style} />
				{showCenterButton && onCenterMap && (
					<button className={styles.button} onClick={onCenterMap}>
						<TextPopover text={t('center_map')} textSize="md">
							{autoZoom ? <IconZoomScan /> : <IconArrowsMinimize />}
						</TextPopover>
					</button>
				)}
				<button className={styles.button} onClick={handleOpenInGoogle}>
					<TextPopover text={t('open_google_maps')} textSize="md">
						<IconMapShare />
					</TextPopover>
				</button>
			</div>
			{toolbarExtras}
		</div>
	);

	//
}
