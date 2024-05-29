'use client';

import { useFrontendStopsContext } from '@/contexts/FrontendStopsContext';
import useSearch from '@/hooks/useSearch';
import parseStopLocationName from '@/services/parseStopLocationName';
import { ActionIcon, Combobox, Highlight, Text, TextInput, useCombobox } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconMapCode, IconSearch, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

import styles from './FrontendStopsToolbarSearch.module.css';

/* * */

export default function FrontendStopsToolbarSearch() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendStopsToolbarSearch');
	const FrontendStopsContext = useFrontendStopsContext();
	const comboboxStore = useCombobox();
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);
	const { FrontendStopsMap } = useMap();

	const [searchQueryCoordinates, setSearchQueryCoordinates] = useState(null);

	//
	// B. Fetch data

	const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

	//
	// C. Transform data

	const allStopsDataFormatted = useMemo(() => {
		if (allStopsData) {
			return allStopsData.map((stop) => {
				return {
					id: stop.id,
					location: parseStopLocationName(stop.locality, stop.municipality_name),
					name: stop.name,
					tts_name: stop.tts_name,
				};
			});
		}
	}, [allStopsData]);

	//
	// D. Search

	const allStopsDataFilteredBySearchQuery = useSearch(debouncedSearchQuery, allStopsDataFormatted, {
		keys: ['id', 'name', 'tts_name', 'location'],
		limitResults: 100,
		regexReplace: /[^a-zA-Z0-9\s]/g,
	});

	//
	// E. Handle actions

	const handleClickSearchField = ({ currentTarget }) => {
		currentTarget.select();
		comboboxStore.openDropdown();
	};

	const handleExitSearchField = () => {
		comboboxStore.closeDropdown();
	};

	const handleClearSearchField = () => {
		setSearchQuery('');
		setSearchQueryCoordinates(null);
		comboboxStore.openDropdown();
	};

	const handleSearchQueryChange = ({ currentTarget }) => {
		// Always update text field
		setSearchQuery(currentTarget.value);
		// Test if the input field is a set of coordinates
		const coordinatesPattern = /^([-+]?\d{1,3}(?:\.|,)(?:\d+))(?:\s+|,)\s*([-+]?\d{1,3}(?:\.|,)(?:\d+))$/;
		const coordinatesMatch = coordinatesPattern.exec(currentTarget.value);
		if (coordinatesMatch && coordinatesMatch.length === 3) setSearchQueryCoordinates([parseFloat(coordinatesMatch[2].replace(',', '.')), parseFloat(coordinatesMatch[1].replace(',', '.'))]);
		else setSearchQueryCoordinates(null);
		// Update combobox
		comboboxStore.updateSelectedOptionIndex();
		comboboxStore.selectFirstOption();
		comboboxStore.openDropdown();
	};

	const handleSelectStop = (chosenStop) => {
		FrontendStopsContext.selectStop(chosenStop.id);
		comboboxStore.closeDropdown();
	};

	const handleSelectCoordinates = () => {
		FrontendStopsContext.clearSelectedStop();
		FrontendStopsContext.setSelectedCoordinates(searchQueryCoordinates);
		comboboxStore.closeDropdown();
	};

	//
	// F. Render components

	return (
		<div className={styles.container}>
			<Combobox store={comboboxStore}>
				<Combobox.Target>
					<TextInput
						aria-label={t('label')}
						autoComplete="off"
						leftSection={<IconSearch size={20} />}
						onBlur={handleExitSearchField}
						onChange={handleSearchQueryChange}
						onClick={handleClickSearchField}
						onFocus={handleClickSearchField}
						placeholder={t('placeholder')}
						size="lg"
						type="search"
						value={searchQuery}
						rightSection={
							searchQuery
							&& (
								<ActionIcon color="gray" onClick={handleClearSearchField} size="md" variant="subtle">
									<IconX size={20} />
								</ActionIcon>
							)

						}
					/>
				</Combobox.Target>

				<Combobox.Dropdown>
					<Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
						{searchQueryCoordinates
							? (
								<Combobox.Option onClick={() => handleSelectCoordinates()} value={searchQuery}>
									<div className={styles.comboboxOption}>
										<div className={styles.coordinatesResult}>
											<IconMapCode size={20} />
											<p className={styles.coordinatesResultLabel}>Mover mapa para estas coordenadas</p>
										</div>
									</div>
								</Combobox.Option>
							)
							: allStopsDataFilteredBySearchQuery.length === 0
								? <Combobox.Empty>{t('no_results')}</Combobox.Empty>
								: allStopsDataFilteredBySearchQuery.map(item => (
									<Combobox.Option key={item.id} onClick={() => handleSelectStop(item)} value={item.id}>
										<div className={styles.comboboxOption}>
											<div className={styles.stopInfo}>
												<Highlight fw={500} fz="sm">
													{item.name}
												</Highlight>
												<Text fz="xs">{item.location}</Text>
											</div>
										</div>
									</Combobox.Option>
								),

								)}
					</Combobox.Options>
				</Combobox.Dropdown>
			</Combobox>
		</div>
	);
}
