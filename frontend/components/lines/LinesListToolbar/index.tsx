'use client';

/* * */

import FoundItemsCounter from '@/components/common/FoundItemsCounter';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { SegmentedControl, TextInput } from '@mantine/core';
import { IconArrowLoopRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

export function LinesListToolbar() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesListToolbar');
	const linesContext = useLinesListContext();

	//
	// B. Transform data

	const currentViewOptions = [
		{ label: t('by_current_view.all'), value: 'all' },
		{ label: t('by_current_view.favorites', { count: linesContext.counters.favorites }), value: 'favorites' },
	];

	//
	// C. Handle actions

	const handleTextInputChange = ({ currentTarget }) => {
		linesContext.actions.updateFilterBySearch(currentTarget.value);
	};

	//
	// D. Render components

	return (
		<Surface>
			<Section heading={t('heading')} withGap withPadding>
				<SegmentedControl data={currentViewOptions} onChange={linesContext.actions.updateFilterByCurrentView} value={linesContext.filters.by_current_view} w="100%" fullWidth />
				{linesContext.filters.by_current_view === 'all' && (
					<>
						<TextInput leftSection={<IconArrowLoopRight size={20} />} onChange={handleTextInputChange} placeholder={t('by_search.placeholder')} type="search" value={linesContext.filters.by_search} w="100%" />
						<FoundItemsCounter text={t('found_items_counter.all', { count: linesContext.data.filtered.length })} />
					</>
				)}
				{linesContext.filters.by_current_view === 'favorites' && (
					<FoundItemsCounter text={t('found_items_counter.favorites', { count: linesContext.data.favorites.length })} />
				)}
			</Section>
		</Surface>
	);

	//
}
