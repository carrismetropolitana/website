'use client';

/* * */

import FoundItemsCounter from '@/components/common/FoundItemsCounter';
import Section from '@/components/layout/Section';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { SegmentedControl, TextInput } from '@mantine/core';
import { IconArrowLoopRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function StopsListToolbar() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsListToolbar');
	const stopsListContext = useStopsListContext();

	//
	// B. Transform data

	const currentViewOptions = [
		{ label: t('filters.by_current_view.all'), value: 'all' },
		{ label: t('filters.by_current_view.favorites'), value: 'favorites' },
	];

	//
	// C. Handle actions

	const handleFormSubmit = (event) => {
		event.preventDefault();
		return false;
	};

	const handleTextInputChange = ({ currentTarget }) => {
		stopsListContext.actions.updateFilterBySearch(currentTarget.value);
	};

	//
	// D. Render components

	return (
		<>
			<Section childrenWrapperStyles={styles.container} heading={t('heading')} withTopBorder={false} withChildrenPadding>
				<SegmentedControl data={currentViewOptions} onChange={stopsListContext.actions.updateFilterByCurrentView} value={stopsListContext.filters.by_current_view} fullWidth />
				{stopsListContext.filters.by_current_view === 'all' && (
					<form className={styles.container} onSubmit={handleFormSubmit}>
						<TextInput leftSection={<IconArrowLoopRight size={20} />} onChange={handleTextInputChange} placeholder={t('filters.by_search.placeholder')} type="search" value={stopsListContext.filters.by_search} />
						<FoundItemsCounter text={t('found_items_counter.all', { count: stopsListContext.data.filtered.length })} />
					</form>
				)}
				{stopsListContext.filters.by_current_view === 'favorites' && (
					<FoundItemsCounter text={t('found_items_counter.favorites', { count: stopsListContext.data.favorites.length })} />
				)}
			</Section>

		</>
	);

	//
}
