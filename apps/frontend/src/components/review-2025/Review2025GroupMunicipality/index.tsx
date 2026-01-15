'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { municipalityData } from '@/components/review-2025/_data/cards';
import { Select } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import styles from './styles.module.css';

import Review2025Card from '../Review2025Card';

/* * */

export function Review2025GroupMunicipality() {
	//
	const t = useTranslations('review-2025.Review2025GroupMunicipality');
	const [selectedArea, setSelectedArea] = useState<null | string>(null);

	//
	// A. Setup variables

	const areaFilterOptions = [
		{ label: t('filter.all'), value: 'all' },
		{ label: t('filter.area1'), value: '1' },
		{ label: t('filter.area2'), value: '2' },
		{ label: t('filter.area3'), value: '3' },
		{ label: t('filter.area4'), value: '4' },
	];

	const handleAreaFilterChange = (value: null | string) => {
		setSelectedArea(value === 'all' || value === null ? null : value);
	};

	//
	// B. Transform data

	const filteredData = useMemo(() => {
		if (!selectedArea) {
			return municipalityData;
		}
		const areaNumber = parseInt(selectedArea, 10) as 1 | 2 | 3 | 4;
		return municipalityData.filter(data => data.area === areaNumber);
	}, [selectedArea]);

	//
	// C. Render components

	return (
		<Surface forceOverflow>
			<Section withPadding="desktop" withGap>
				<div className={styles.headingWrapper}>
					<h2 className={styles.heading}>{t('heading')}</h2>
					<h5 className={styles.subheading}>{t('subheading')}</h5>
				</div>
			</Section>
			<Section withGap withPadding>
				<Select
					className={styles.filter}
					data={areaFilterOptions}
					leftSection={<IconFilter />}
					onChange={handleAreaFilterChange}
					placeholder={t('filter.placeholder')}
					value={selectedArea}
					w="100%"
					clearable
				/>
				<Grid columns="abc" withGap>
					{filteredData.map((data, index) => <Review2025Card key={index} data={data} />)}
				</Grid>
			</Section>
		</Surface>
	);
	//
}
