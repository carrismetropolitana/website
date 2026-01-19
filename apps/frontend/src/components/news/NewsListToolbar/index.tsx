'use client';

/* * */

import { FoundItemsCounter } from '@/components/common/FoundItemsCounter';
import { useNewsListContext } from '@/contexts/NewsList.context';
import { TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendarEvent, IconSearch } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export function NewsListToolbar() {
	//

	//
	// A. Setup variables

	const t = useTranslations('news.NewsListToolbar');
	const newsListContext = useNewsListContext();

	//
	// B. Transform data

	const availableDates = useMemo(() => {
		const formatedDates = newsListContext.data.raw.map(newsItem => DateTime.fromISO(newsItem.publishedAt).toFormat('yyyyMMdd'));
		return new Set(formatedDates);
	}, [newsListContext.data.raw]);

	//
	// C. Handle actions

	const handleTextInputChange = ({ currentTarget }) => {
		newsListContext.actions.updateFilterBySearch(currentTarget.value);
	};

	const handleDateInputChange = (value: null | string) => {
		newsListContext.actions.updateFilterByDate(value);
	};

	const handleExcludeDates = (value: string) => {
		const formatedDate = DateTime.fromFormat(value, 'yyyy-MM-dd').toFormat('yyyyMMdd');
		return !availableDates.has(formatedDate);
	};

	//
	// D. Render components

	return (
		<>

			<div className={styles.innerWrapper}>
				<TextInput
					leftSection={<IconSearch size={20} />}
					onChange={handleTextInputChange}
					placeholder={t('filters.by_search.placeholder')}
					type="search"
					value={newsListContext.filters.by_search}
					w="100%"
				/>
				<DatePickerInput
					dropdownType="modal"
					excludeDate={handleExcludeDates}
					leftSection={<IconCalendarEvent size={20} />}
					onChange={handleDateInputChange}
					placeholder={t('filters.by_date.placeholder')}
					size="lg"
					value={newsListContext.filters.by_date}
					valueFormat="DD MMM YYYY"
					allowDeselect
					clearable
				/>
			</div>

			<FoundItemsCounter text={t('found_items_counter', { count: newsListContext.data.filtered.length })} />

		</>
	);

	//
}
