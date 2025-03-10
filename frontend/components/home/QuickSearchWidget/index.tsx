'use client';

/* * */

import { SelectLine } from '@/components/common/SelectLine';
import { SelectStop } from '@/components/common/SelectStop';
import { useLinesContext } from '@/contexts/Lines.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { Routes } from '@/utils/routes';
import { SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

export function QuickSearchWidget() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeQuickSearchWidget');

	const stopsContext = useStopsContext();
	const linesContext = useLinesContext();

	const [selectedSearchType, setSelectedSearchType] = useState('lines');
	const [selectedLineId, setSelectedLineId] = useState(null);
	const [selectedStopId, setSelectedStopId] = useState(null);
	const router = useRouter();

	//
	// B. Transform data

	const segmentedControlOptions = [
		{ label: t('options.lines'), value: 'lines' },
		{ label: t('options.stops'), value: 'stops' },
	];

	//
	// C. Handle actions

	const handleSelectLine = (selectedLineId) => {
		setSelectedLineId(selectedLineId);
		router.push(`${Routes.LINES.route}/${selectedLineId}`);
	};

	const handleSelectStop = (selectedStopId) => {
		setSelectedStopId(selectedStopId);
		router.push(`${Routes.STOPS.route}/${selectedStopId}`);
	};

	//
	// D. Render Components

	return (
		<div className={styles.container}>
			<div className={styles.introWrapper}>
				<h1 className={styles.introTitle}>{t('title')}</h1>
				<p className={styles.introSubtitle}>{t('subtitle')}</p>
			</div>
			<div className={styles.searchWrapper}>
				<SegmentedControl data={segmentedControlOptions} onChange={setSelectedSearchType} value={selectedSearchType} variant="white" />
				<div className={styles.searchInputWrapper}>
					{selectedSearchType === 'lines' && <SelectLine data={linesContext.data.lines} onSelectLineId={handleSelectLine} selectedLineId={selectedLineId} variant="white" />}
					{selectedSearchType === 'stops' && <SelectStop data={stopsContext.data.stops} onSelectStopId={handleSelectStop} selectedStopId={selectedStopId} variant="white" />}
				</div>
			</div>
		</div>
	);

	//
}
