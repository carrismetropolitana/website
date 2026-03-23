'use client';

/* * */

import { FoundItemsCounter } from '@/components/common/FoundItemsCounter';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { SegmentedControl, TextInput } from '@mantine/core';
import { IconArrowLoopRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

export function StopsListToolbar() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsListToolbar');
	const stopsListContext = useStopsListContext();
	const environmentContext = useEnvironmentContext();
	const isMupi = environmentContext.data.value === 'mupi';

	//
	// B. Transform data

	const currentViewOptions = [
		{ label: t('filters.by_current_view.map'), value: 'map' },
		{ label: t('filters.by_current_view.list'), value: 'list' },
		...(!isMupi ? [{ label: t('filters.by_current_view.favorites', { count: stopsListContext.counters.favorites }), value: 'favorites' }] : []),
	];

	//
	// C. Handle actions

	const handleTextInputChange = ({ currentTarget }) => {
		stopsListContext.actions.updateFilterBySearch(currentTarget.value);
	};

	//
	// D. Render components

	return (
		<Surface>
			<Section heading={t('heading')} withGap withPadding>
				<SegmentedControl data={currentViewOptions} onChange={stopsListContext.actions.updateFilterByCurrentView} value={stopsListContext.filters.by_current_view} w="100%" fullWidth />
				{(stopsListContext.filters.by_current_view === 'list' || stopsListContext.filters.by_current_view === 'map') && (
					<>
						<TextInput leftSection={<IconArrowLoopRight size={20} />} onChange={handleTextInputChange} placeholder={t('filters.by_search.placeholder')} type="search" value={stopsListContext.filters.by_search} w="100%" />
						<FoundItemsCounter text={t('found_items_counter.all', { count: stopsListContext.data.filtered.length })} />
					</>
				)}
				{stopsListContext.filters.by_current_view === 'favorites' && (
					<FoundItemsCounter text={t('found_items_counter.favorites', { count: stopsListContext.data.favorites.length })} />
				)}
			</Section>
		</Surface>
	);

	//
}
