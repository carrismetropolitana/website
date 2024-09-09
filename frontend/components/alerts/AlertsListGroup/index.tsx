'use client';

/* * */

import type { AlertGroupByDate } from '@/types/alerts.types';

import AlertsListEmpty from '@/components/alerts/AlertsListEmpty';
import AlertListItem from '@/components/alerts/AlertsListItem';
import AlertsListItemSkeleton from '@/components/alerts/AlertsListItemSkeleton';
import GroupedListItem from '@/components/layout/GroupedListItem';
import GroupedListSkeleton from '@/components/layout/GroupedListSkeleton';
import { useAlertsListContext } from '@/contexts/AlertsList.context';
import collator from '@/utils/collator';
import { Accordion } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const alertsListContext = useAlertsListContext();
	const t = useTranslations('alerts.AlertsListGroup');

	//
	// B. Transform data

	const allAlertsGroupedByStartDate = useMemo(() => {
		//
		if (!alertsListContext.data) return [];
		//
		const groupedAlerts: AlertGroupByDate[] = alertsListContext.data.filtered.reduce((result: AlertGroupByDate[], item) => {
			const alertStartDateObject = DateTime.fromSeconds(item.activePeriod[0].start);
			const alertStartDateString = alertStartDateObject.toFormat('yyyyMMdd');
			const existingGroup = result.find(group => group.value === alertStartDateString);
			if (existingGroup) {
				existingGroup.items.push(item);
			}
			else {
				let formattedGroupLabel = '';
				const today = DateTime.local().startOf('day');
				const alertStartDateObjectCompare = alertStartDateObject.startOf('day');
				if (alertStartDateObjectCompare.equals(today)) {
					formattedGroupLabel = t('titles.today', { value: alertStartDateObject.toJSDate() });
				}
				else if (alertStartDateObjectCompare.equals(today.plus({ days: 1 }))) {
					formattedGroupLabel = t('titles.tomorrow', { value: alertStartDateObject.toJSDate() });
				}
				else if (alertStartDateObjectCompare.equals(today.minus({ days: 1 }))) {
					formattedGroupLabel = t('titles.yesterday', { value: alertStartDateObject.toJSDate() });
				}
				else if (alertStartDateObjectCompare < today.minus({ days: 1 })) {
					formattedGroupLabel = t('titles.past', { value: alertStartDateObject.toJSDate() });
				}
				else {
					formattedGroupLabel = t('titles.future', { value: alertStartDateObject.toJSDate() });
				}
				result.push({
					items: [item],
					title: formattedGroupLabel,
					value: alertStartDateString,
				});
			}
			return result;
		}, []) || [];
		//
		const sortedGroups = groupedAlerts.sort((a, b) => collator.compare(b.value, a.value));
		//
		return sortedGroups;
		//
	}, [alertsListContext.data]);

	//
	// C. Render components

	if (alertsListContext.flags.is_loading) {
		return (
			<GroupedListSkeleton groupCount={3} itemCount={2} itemSkeleton={<AlertsListItemSkeleton />} />
		);
	}

	if (allAlertsGroupedByStartDate.length > 0) {
		return (
			allAlertsGroupedByStartDate.map(alertGroup => (
				<GroupedListItem key={alertGroup.value} label={t('label', { count: alertGroup.items.length })} title={alertGroup.title}>
					<Accordion>
						{alertGroup.items.map(alert => (
							<AlertListItem key={alert.alert_id} alertId={alert.alert_id} />
						))}
					</Accordion>
				</GroupedListItem>
			))
		);
	}

	return (
		<AlertsListEmpty />
	);

	//
}
