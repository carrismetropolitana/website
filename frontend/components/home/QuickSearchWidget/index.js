'use client';

/* * */

import SelectLine from '@/components/common/SelectLine';
import { useRouter } from '@/translations/navigation';
import { SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeQuickSearchWidget');
	const [selectedSearchType, setSelectedSearchType] = useState('lines');
	const [selectedLineId, setSelectedLineId] = useState(null);
	const [selectedStopId, setSelectedStopId] = useState(null);
	const router = useRouter();

	//
	// B. Fetch data

	const { data: allLinesData } = useSWR('https://api.carrismetropolitana.pt/lines');

	//
	// C. Transform data

	const segmentedControlOptions = [
		{ label: t('options.lines'), value: 'lines' },
		{ label: t('options.stops'), value: 'stops' },
	];

	//
	// D. Handle actions

	const handleSelectLine = (selectedLineId) => {
		setSelectedLineId(selectedLineId);
		router.push(`/lines/${selectedLineId}`);
	};

	//
	// E. Render Components

	return (
		<div className={styles.container}>
			<div className={styles.introWrapper}>
				<h1 className={styles.introTitle}>{t('title')}</h1>
				<p className={styles.introSubtitle}>{t('subtitle')}</p>
			</div>
			<div className={styles.searchWrapper}>
				<SegmentedControl data={segmentedControlOptions} onChange={setSelectedSearchType} value={selectedSearchType} variant="white" />
				<div className={styles.searchInputWrapper}>
					{selectedSearchType === 'lines' && <SelectLine data={allLinesData} onSelectLineId={handleSelectLine} selectedLineId={selectedLineId} variant="white" />}
					{selectedSearchType === 'stops' && <p>stops</p>}
				</div>
			</div>
		</div>
	);

	//
}
