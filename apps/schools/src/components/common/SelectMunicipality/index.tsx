'use client';

/* * */

import { Select } from '@mantine/core';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface Props {
	onSelectMunicipalityId: (municipalityId: string) => void
	selectedMunicipalityId: null | string
}

/* * */

export function SelectMunicipality({ onSelectMunicipalityId, selectedMunicipalityId }: Props) {
	//

	//
	// A. Fetch data

	const { data: allMunicipalitiesData } = useSWR('https://api.carrismetropolitana.pt/municipalities');

	//
	// B. Transform data

	const allMunicipalitiesDataAsSelectOptions = useMemo(() => {
		// Return empty array if data is not available
		if (!allMunicipalitiesData) return [];
		// Return formatted array for select
		const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
		const allMunicipalitiesSorted = allMunicipalitiesData.sort((a, b) => collator.compare(a.name, b.name));
		return allMunicipalitiesSorted.map(item => ({ label: item.name, value: item.id }));
		//
	}, [allMunicipalitiesData, selectedMunicipalityId]);

	//
	// C. Render components

	return (
		<Select
			aria-label="Filtrar por Município"
			data={allMunicipalitiesDataAsSelectOptions}
			nothingFoundMessage="Município inexistente"
			onChange={onSelectMunicipalityId}
			placeholder="Escolha ou digite um Municípios"
			value={selectedMunicipalityId}
			clearable
			searchable
		/>
	);

	//
}
