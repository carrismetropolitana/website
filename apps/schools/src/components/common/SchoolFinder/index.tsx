'use client';

/* * */

import { SelectEducationLevel } from '@/components/common/SelectEducationLevel';
import { SelectMunicipality } from '@/components/common/SelectMunicipality';
import { SelectSchool } from '@/components/common/SelectSchool';
import { MapViewSchools } from '@/components/map/MapViewSchools';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface Props {
	onSelectEducationLevel: (educationLevel: string) => void
	onSelectMunicipalityId: (municpalityId: string) => void
	onSelectSchool: (schoolId: string) => void
	selectedEducationLevel: null | string
	selectedMunicipalityId: null | string
	title: string
}

/* * */

export function SchoolFinder({ onSelectEducationLevel, onSelectMunicipalityId, onSelectSchool, selectedEducationLevel, selectedMunicipalityId, title }: Props) {
	//

	//
	// A. Fetch data

	const { data: allSchoolsData } = useSWR('https://api.carrismetropolitana.pt/v2/facilities/schools');

	//
	// B. Transform data

	const allSchoolsSimplified = useMemo(() => {
		// Return empty array if data is not available
		if (!allSchoolsData) return [];
		// Filter out schools without stops on our municipalities
		const filteredOutSchools = allSchoolsData;
		// const filteredOutSchools = allSchoolsData.filter((item) => {
		// 	// Include the school if it is from Barreiro, Cascais or Lisbon
		// 	// even if it does not have associated stops.
		// 	const isFromBarreiro = item.municipality_id === '1504';
		// 	const isFromCascais = item.municipality_id === '1105';
		// 	const isFromLisbon = item.municipality_id === '1106';
		// 	if (isFromBarreiro || isFromCascais || isFromLisbon) return true;
		// 	// If it is from other municipalities,
		// 	// include the school only if it has associated stops
		// 	return item.stops?.length > 0;
		// 	//
		// });
		// Sort schools by name
		const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
		const sortedSchools = filteredOutSchools.sort((a, b) => collator.compare(a.name, b.name));
		// Keep only the required values
		return sortedSchools.map(item => ({
			cicles: item.cicles,
			id: item.id,
			lat: item.lat,
			locality: item.locality,
			lon: item.lon,
			municipality_id: item.municipality_id,
			municipality_name: item.municipality_name,
			name: item.name,
		}));
		//
	}, [allSchoolsData]);

	const allSchoolsFiltered = useMemo(() => {
		// Return empty array if data is not available
		if (!allSchoolsSimplified) return [];
		// Setup a variable to hold filtered results
		let filterResult = allSchoolsSimplified;
		// If a municipality is selected, show schools only from that municipality
		if (selectedMunicipalityId) {
			filterResult = filterResult.filter(item => item.municipality_id === selectedMunicipalityId);
		}
		// If an education level is selected, show schools only from that level
		if (selectedEducationLevel) {
			filterResult = filterResult.filter(item => item.cicles?.includes(selectedEducationLevel));
			filterResult = filterResult.filter((school) => {
				return school.cicles?.includes(selectedEducationLevel);
			});
		}
		// Set filter results
		return filterResult;
		//
	}, [allSchoolsSimplified, selectedMunicipalityId, selectedEducationLevel]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>
			<div className={styles.filters}>
				<SelectMunicipality onSelectMunicipalityId={onSelectMunicipalityId} selectedMunicipalityId={selectedMunicipalityId} />
				<SelectEducationLevel onSelectEducationLevel={onSelectEducationLevel} selectedEducationLevel={selectedEducationLevel} />
			</div>
			<SelectSchool allSchoolsData={allSchoolsFiltered} onSelectSchool={onSelectSchool} />
			{allSchoolsSimplified && (
				<MapViewSchools
					allSchoolsData={allSchoolsFiltered}
					onSelectSchool={onSelectSchool}
				/>
			)}
		</div>
	);

	//
}
