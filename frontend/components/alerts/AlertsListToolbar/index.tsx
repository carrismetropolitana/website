'use client';

/* * */

import FoundItemsCounter from '@/components/common/FoundItemsCounter';
import Input from '@/components/common/Input';
import SelectLine from '@/components/common/SelectLine';
import SelectStop from '@/components/common/SelectStop';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useAlertsListContext } from '@/contexts/AlertsList.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { SegmentedControl } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useState } from 'react';

import SelectCause from '../SelectCause';
import SelectEffect from '../SelectEffect';
import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertsListToolbar');
	const alertsContext = useAlertsListContext();
	const linesContext = useLinesContext();
	const stopsContext = useStopsContext();
	const [searchQuery, setSearchQuery] = useState(alertsContext.filters.search_query);

	//
	// B. Transform data

	const byCurrentStatusOptions = [
		{ label: t('by_date.current', { count: alertsContext.counters.by_date.current }), value: 'current' },
		{ label: t('by_date.future', { count: alertsContext.counters.by_date.future }), value: 'future' },
	];

	//
	// C. Handle actions

	const handleFilterBySearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		alertsContext.actions.updateFilterBySearchQuery(event.target.value);
	};

	//
	// D. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withGap withPadding>
				<SegmentedControl data={byCurrentStatusOptions} onChange={alertsContext.actions.updateFilterByDate} value={alertsContext.filters.by_date} w="100%" fullWidth />
				<Input leftSection={<IconSearch size={20} />} onChange={handleFilterBySearchQuery} placeholder={t('filters.text_search')} value={searchQuery ?? ''} w="100%" />
				<div className={styles.selectsWrapper}>
					<SelectLine
						data={linesContext.data.raw}
						onSelectLineId={alertsContext.actions.updateFilterByLineId}
						selectedLineId={alertsContext.filters.line_id}
						variant="default"
					/>
					<SelectStop
						data={stopsContext.data.raw}
						onSelectStopId={alertsContext.actions.updateFilterByStopId}
						selectedStopId={alertsContext.filters.stop_id}
						variant="default"
					/>
					<SelectCause onChange={alertsContext.actions.updateFilterByCause} value={alertsContext.filters.cause} />
					<SelectEffect onChange={alertsContext.actions.updateFilterByEffect} value={alertsContext.filters.effect} />
				</div>
				<FoundItemsCounter text={t('found_items_counter', { count: alertsContext.data.filtered.length })} />
			</Section>
		</Surface>
	);

	//
}
