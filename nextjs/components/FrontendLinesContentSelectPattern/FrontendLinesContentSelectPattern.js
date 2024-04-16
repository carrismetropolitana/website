'use client';

/* * */

import { Combobox, TextInput, useCombobox, ActionIcon, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './FrontendLinesContentSelectPattern.module.css';
import useSearch from '@/hooks/useSearch';
import { IconSearch, IconSelector } from '@tabler/icons-react';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import { useDebouncedValue } from '@mantine/hooks';

/* * */

export default function FrontendLinesContentSelectPattern() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendLinesContentSelectPattern');
	const FrontendLinesContext = useFrontendLinesContext();
	const comboboxStore = useCombobox();
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 10);
	const [allRoutesData, setAllRoutesData] = useState([]);
	const [allPatternsData, setAllPatternsData] = useState([]);

	//
	// B. Fetch data

	useEffect(() => {
		(async function () {
			// Exit if no line is selected
			if (!FrontendLinesContext.entities?.line?.id) return;

			// Loop through each line route to retrieve its info
			const formattedRouteOptions = await Promise.all(
				FrontendLinesContext.entities.line.routes.map(async routeId => {
					const routeDataResponse = await fetch(`https://api.carrismetropolitana.pt/routes/${routeId}`);
					return routeDataResponse.json();
				}),
			);

			// Loop through each line pattern to retrieve its info
			const formattedPatternOptions = await Promise.all(
				FrontendLinesContext.entities.line.patterns.map(async patternId => {
					const patternDataResponse = await fetch(`https://api.carrismetropolitana.pt/patterns/${patternId}`);
					const patternData = await patternDataResponse.json();
					return { ...patternData, route: formattedRouteOptions.find(route => route.id === patternData.route_id) };
				}),
			);

			// Update state with formatted patterns
			setAllRoutesData(formattedRouteOptions);
			setAllPatternsData(formattedPatternOptions);
			//
		})();
	}, [FrontendLinesContext.entities.line?.id, FrontendLinesContext.entities.line?.patterns, FrontendLinesContext.entities.line?.routes]);

	useEffect(() => {
		// Pre-select the first pattern if none is selected
		if (!FrontendLinesContext.entities.pattern && allPatternsData.length > 0) {
			const firstPatternInTheArray = allPatternsData[0];
			const foundParentRoute = allRoutesData.find(route => route.id === firstPatternInTheArray.route_id);
			// Pre-select the first route and pattern if it belongs to the selected line
			if (firstPatternInTheArray.line_id === FrontendLinesContext.entities.line.id && foundParentRoute) {
				FrontendLinesContext.selectPattern(foundParentRoute, allPatternsData[0]);
			}
		}
	}, [allPatternsData, allRoutesData, FrontendLinesContext]);

	//
	// C. Search

	const allPatternsDataFilteredBySearchQuery = useSearch(debouncedSearchQuery, allPatternsData, {
		keys: ['id', 'headsign', 'municipalities', 'localities'],
		regexReplace: /[^a-zA-Z0-9\s]/g,
	});

	//
	// D. Handle actions

	const handleClickSearchField = ({ currentTarget }) => {
		if (currentTarget.select) currentTarget.select();
		comboboxStore.openDropdown();
		comboboxStore.focusTarget();
	};

	const handleExitSearchField = () => {
		comboboxStore.closeDropdown();
	};

	// const handleClearSearchField = () => {
	// 	setSearchQuery('');
	// 	FrontendLinesContext.clearSelectedPattern();
	// 	comboboxStore.openDropdown();
	// };

	const handleSearchQueryChange = ({ currentTarget }) => {
		setSearchQuery(currentTarget.value);
		comboboxStore.updateSelectedOptionIndex();
		comboboxStore.selectFirstOption();
		comboboxStore.openDropdown();
	};

	const handleSelectPattern = chosenSelectItemValue => {
		const foundRoute = allRoutesData.find(item => item.route_id === chosenSelectItemValue);
		const foundPattern = allPatternsData.find(item => item.id === chosenSelectItemValue);
		if (foundPattern) {
			FrontendLinesContext.selectPattern(foundRoute, foundPattern);
			comboboxStore.closeDropdown();
		}
	};

	//
	// E. Render components

	return (
		<div className={styles.container}>
			<Combobox onOptionSubmit={handleSelectPattern} store={comboboxStore}>
				<Combobox.Target>
					{FrontendLinesContext.entities.line?.id && FrontendLinesContext.entities.pattern?.id && !comboboxStore.dropdownOpened ?
						<Group className={styles.comboboxTarget} onClick={handleClickSearchField}>
							<IconSearch size={20} />
							<p className={styles.comboboxSelection}>{FrontendLinesContext.entities.pattern?.headsign}</p>
							<ActionIcon size='md' variant='subtle' color='gray'>
								<IconSelector size={20} />
							</ActionIcon>
						</Group> :
						<TextInput
							autoComplete='off'
							type='search'
							aria-label={t('label')}
							placeholder={t('placeholder')}
							value={searchQuery}
							size='lg'
							leftSection={<IconSearch size={20} />}
							rightSection={<IconSelector size={20} />}
							onChange={handleSearchQueryChange}
							onClick={handleClickSearchField}
							onFocus={handleClickSearchField}
							onBlur={handleExitSearchField}
							className={styles.comboboxInput}
						/>
					}
				</Combobox.Target>

				<Combobox.Dropdown className={styles.comboboxDropdown}>
					<Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
						{allPatternsDataFilteredBySearchQuery.length === 0 ?
							<Combobox.Empty>{t('no_results')}</Combobox.Empty> :
							allPatternsDataFilteredBySearchQuery.map(item => <Combobox.Option key={item.id} value={item.id} className={item.id === FrontendLinesContext.entities.pattern?.id && styles.selected}>
								<div className={styles.comboboxOption}>
									{/* <p className={styles.tripHeadsign}>{t('options.headsign', { value: item.headsign })}</p> */}
									<p className={styles.tripHeadsign}>{item.headsign}</p>
									<p className={styles.routeName}>{item.route.long_name}</p>
									{/* de {FrontendLinesContext.entities.pattern.path[0].stop.locality} para {item.headsign} */}
								</div>
							</Combobox.Option>)
						}
					</Combobox.Options>
				</Combobox.Dropdown>
			</Combobox>
		</div>
	);

	//
}