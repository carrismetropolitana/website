'use client';

/* * */

import { ExpandToggle } from '@/components/common/ExpandToggle';
import { FoundItemsCounter } from '@/components/common/FoundItemsCounter';
import Input from '@/components/common/Input';
import { SelectLine } from '@/components/common/SelectLine';
import { SelectStop } from '@/components/common/SelectStop';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useAlertsListContext } from '@/contexts/AlertsList.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { SegmentedControl } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useState } from 'react';

import styles from './styles.module.css';

import SelectCause from '../SelectCause';
import SelectEffect from '../SelectEffect';

/* * */

export function AlertsListToolbar() {
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
		{ label: t('by_date.map'), value: 'map' },
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
				{alertsContext.filters.by_date != 'map' && (
					<>
						<Input leftSection={<IconSearch size={20} />} onChange={handleFilterBySearchQuery} placeholder={t('filters.text_search')} value={searchQuery ?? ''} w="100%" />
						<ExpandToggle defaultState={!!alertsContext.filters.line_id || !!alertsContext.filters.stop_id || !!alertsContext.filters.cause || !!alertsContext.filters.effect}>
							<div className={styles.selectsWrapper}>
								<SelectLine
									data={linesContext.data.lines}
									label={t('filters.by_line.label')}
									onSelectLineId={alertsContext.actions.updateFilterByLineId}
									placeholder={t('filters.by_line.placeholder')}
									selectedLineId={alertsContext.filters.line_id}
									variant="default"
								/>
								<SelectStop
									data={stopsContext.data.stops}
									label={t('filters.by_stop.label')}
									onSelectStopId={alertsContext.actions.updateFilterByStopId}
									placeholder={t('filters.by_stop.placeholder')}
									selectedStopId={alertsContext.filters.stop_id}
									variant="default"
								/>
								<SelectCause onChange={alertsContext.actions.updateFilterByCause} value={alertsContext.filters.cause} />
								<SelectEffect onChange={alertsContext.actions.updateFilterByEffect} value={alertsContext.filters.effect} />
							</div>
						</ExpandToggle>
						<FoundItemsCounter text={t('found_items_counter', { count: alertsContext.data.filtered.length })} />
					</>
				)}
			</Section>
		</Surface>
	);

	//
}
