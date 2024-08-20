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

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.PageToolbar');
	const stopsContext = useStopsListContext();

	//
	// B. Transform data

	const currentViewOptions = [
		{ label: t('by_current_view.all'), value: 'all' },
		{ label: t('by_current_view.favorites'), value: 'favorites' },
	];

	//
	// C. Handle actions

	const handleFormSubmit = (event) => {
		event.preventDefault();
		return false;
	};

	const handleTextInputChange = ({ currentTarget }) => {
		stopsContext.actions.updateFilterBySearch(currentTarget.value);
	};

	//
	// D. Render components

	return (
		<>
			<Section childrenWrapperStyles={styles.container} withTopBorder={false} withTopPadding={false} withChildrenPadding>
				<SegmentedControl data={currentViewOptions} onChange={stopsContext.actions.updateFilterByCurrentView} value={stopsContext.filters.by_current_view} fullWidth />
				{stopsContext.filters.by_current_view === 'all' && (
					<form className={styles.container} onSubmit={handleFormSubmit}>
						<TextInput leftSection={<IconArrowLoopRight size={20} />} onChange={handleTextInputChange} placeholder={t('by_search.placeholder')} type="search" value={stopsContext.filters.by_search} />
						<FoundItemsCounter text={t('found_items_counter.all', { count: stopsContext.data.filtered.length })} />
					</form>
				)}
				{stopsContext.filters.by_current_view === 'favorites' && (
					<FoundItemsCounter text={t('found_items_counter.favorites', { count: stopsContext.data.favorites.length })} />
				)}
			</Section>

		</>
	);

	//
}
