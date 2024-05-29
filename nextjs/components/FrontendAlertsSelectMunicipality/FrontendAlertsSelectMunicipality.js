'use client';

/* * */

import { Select } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './FrontendAlertsSelectMunicipality.module.css';
import selectStyles from './MantineSelect.module.css';

/* * */

export default function FrontendLinesToolbarFiltersMunicipality({ ctx }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendLinesToolbarFiltersMunicipality');

	//
	// B. Fetch data

	const { data: allMunicipalitiesData } = useSWR('https://api.carrismetropolitana.pt/municipalities');

	//
	// C. Transform data

	const allMunicipalitiesDataFormatted = useMemo(() => {
		if (!allMunicipalitiesData) return [];
		const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
		allMunicipalitiesData.sort((a, b) => collator.compare(a.name, b.name));
		return allMunicipalitiesData.map((item) => {
			return { label: item.name, value: item.id };
		});
	}, [allMunicipalitiesData]);

	//
	// D. Handle actions

	const handleSelectMunicipality = (chosenSelectItemValue) => {
		if (chosenSelectItemValue) {
			const foundMunicipality = allMunicipalitiesData.find(item => item.id === chosenSelectItemValue);
			if (foundMunicipality) ctx.selectMunicipality(foundMunicipality);
		}
		else {
			ctx.clearSelectedMunicipality();
		}
	};

	//
	// E. Render components

	return (
		<div className={styles.container}>
			<Select
				aria-label={t('label')}
				classNames={selectStyles}
				data={allMunicipalitiesDataFormatted}
				h="100%"
				nothingFoundMessage={t('no_results')}
				onChange={handleSelectMunicipality}
				placeholder={t('placeholder')}
				radius="sm"
				size="lg"
				value={ctx.entities.municipality?.id || null}
				w="100%"
				clearable
				searchable
			/>
		</div>
	);

	//
}
