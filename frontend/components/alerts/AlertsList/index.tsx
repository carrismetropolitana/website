'use client';

/* * */

import type { AlertGroupByDate } from '@/types/alerts.types';

import AlertsListEmpty from '@/components/alerts/AlertsListEmpty';
import AlertListItem from '@/components/alerts/AlertsListItem';
import AlertsListItemSkeleton from '@/components/alerts/AlertsListItemSkeleton';
import GroupedListItem from '@/components/layout/GroupedListItem';
import GroupedListSkeleton from '@/components/layout/GroupedListSkeleton';
import { useAlertsContext } from '@/contexts/alerts.context';
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

	const alertsContext = useAlertsContext();
	const t = useTranslations('alerts.AlertsList');

	//
	// B. Transform data

	const allAlertsGroupedByStartDate = useMemo(() => {
		//
		if (!alertsContext.data) return [];
		//
		const groupedAlerts: AlertGroupByDate[] = alertsContext.data.filtered.reduce((result: AlertGroupByDate[], item) => {
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
					formattedGroupLabel = t('group_labels.today', { value: alertStartDateObject.toJSDate() });
				}
				else if (alertStartDateObjectCompare.equals(today.plus({ days: 1 }))) {
					formattedGroupLabel = t('group_labels.tomorrow', { value: alertStartDateObject.toJSDate() });
				}
				else if (alertStartDateObjectCompare.equals(today.minus({ days: 1 }))) {
					formattedGroupLabel = t('group_labels.yesterday', { value: alertStartDateObject.toJSDate() });
				}
				else if (alertStartDateObjectCompare < today.minus({ days: 1 })) {
					formattedGroupLabel = t('group_labels.past', { value: alertStartDateObject.toJSDate() });
				}
				else {
					formattedGroupLabel = t('group_labels.future', { value: alertStartDateObject.toJSDate() });
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
	}, [alertsContext.data]);

	//
	// C. Render components

	if (alertsContext.flags.is_loading) {
		return (
			<GroupedListSkeleton groupCount={3} itemCount={2} itemSkeleton={<AlertsListItemSkeleton />} />
		);
	}

	if (allAlertsGroupedByStartDate.length > 0) {
		return (
			allAlertsGroupedByStartDate.map(alertGroup => (
				<GroupedListItem key={alertGroup.value} label="Alertas ativos" title={alertGroup.title}>
					<Accordion>
						{alertGroup.items.map(alert => (
							<AlertListItem key={alert._id} data={alert} />
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
