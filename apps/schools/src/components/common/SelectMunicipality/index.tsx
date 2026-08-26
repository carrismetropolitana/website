'use client';

import { type ApiResponse } from '@carrismetropolitana/api-types/common';
import { type Municipality } from '@carrismetropolitana/api-types/locations';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';

/* * */

import { Select } from '@mantine/core';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface Props {
	onSelectMunicipalityId: (municipalityId: null | string) => void
	selectedMunicipalityId: null | string
}

export function SelectMunicipality({ onSelectMunicipalityId, selectedMunicipalityId }: Props) {
	//

	//
	// A. Fetch data

	const { data: allMunicipalitiesData, isLoading: allMunicipalitiesLoading } = useSWR<ApiResponse<Municipality[]>, Error>(`${getPublicVariable('go_api_url')}/locations/api/locations/municipalities`, { refreshInterval: 900000 }); // 15 minutes

	//
	// B. Transform data

	const allMunicipalitiesDataAsSelectOptions = useMemo(() => {
		// Return empty array if data is not available
		if (allMunicipalitiesData?.status !== 'success' || allMunicipalitiesLoading) return [];
		// Return formatted array for select
		const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
		const allMunicipalitiesSorted = [...allMunicipalitiesData.data].sort((a, b) => collator.compare(a.name, b.name));
		return allMunicipalitiesSorted.map(item => ({ label: item.name, value: item.id }));
		//
	}, [allMunicipalitiesData, allMunicipalitiesLoading]);

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
