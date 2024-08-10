'use client';

/* * */

import FoundItemsCounter from '@/components/common/FoundItemsCounter';
import Section from '@/components/layout/Section';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { SegmentedControl, TextInput } from '@mantine/core';
import { IconArrowLoopRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.PageToolbar');
	const linesContext = useLinesListContext();

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
		linesContext.actions.updateFilterBySearch(currentTarget.value);
	};

	//
	// D. Render components

	return (
		<>
			<Section childrenWrapperStyles={styles.container} withTopBorder={false} withTopPadding={false} withChildrenPadding>
				<SegmentedControl data={currentViewOptions} onChange={linesContext.actions.updateFilterByCurrentView} value={linesContext.filters.by_current_view} fullWidth />
				{linesContext.filters.by_current_view === 'all' && (
					<form className={styles.container} onSubmit={handleFormSubmit}>
						<TextInput leftSection={<IconArrowLoopRight size={20} />} onChange={handleTextInputChange} placeholder={t('by_search.placeholder')} type="search" value={linesContext.filters.by_search} />
						<FoundItemsCounter text={t('found_items_counter.all', { count: linesContext.data.filtered.length })} />
					</form>
				)}
				{linesContext.filters.by_current_view === 'favorites' && (
					<FoundItemsCounter text={t('found_items_counter.favorites', { count: linesContext.data.favorites.length })} />
				)}
			</Section>

		</>
	);

	//
}
