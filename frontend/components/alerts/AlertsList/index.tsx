'use client';

/* * */

import type { AlertGroupByDate } from '@/types/alerts.types';

// import AlertsListEmpty from '@/components/alerts/AlertsListEmpty';
import AlertListItem from '@/components/alerts/AlertsListItem';
// import AlertsListItemSkeleton from '@/components/alerts/AlertsListItemSkeleton';
import GroupedListItem from '@/components/layout/GroupedListItem';
// import GroupedListSkeleton from '@/components/layout/GroupedListSkeleton';
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

	const t = useTranslations('alerts.AlertsList');
	const alertsContext = useAlertsContext();

	//
	// B. Transform data

	const allAlertsGroupedByMunicipality = useMemo(() => {
		//
		if (!alertsContext.data) return [];
		//
		const groupedAlerts: AlertGroupByDate[] = alertsContext.data.filtered.reduce((result: AlertGroupByDate[], item) => {
			const alertStartDate = DateTime.fromSeconds(item.activePeriod[0].start).toFormat('yyyy-MM-dd');
			const existingGroup = result.find(group => group.start_date === alertStartDate);
			if (existingGroup) {
				existingGroup.alerts.push(item);
			}
			else {
				result.push({
					alerts: [item],
					start_date: alertStartDate,
				});
			}
			return result;
		}, []) || [];
		//
		const sortedGroups = groupedAlerts.sort((a, b) => collator.compare(a.start_date, b.start_date));
		//
		return sortedGroups;
		//
	}, [alertsContext.data]);

	//
	// C. Render components

	// if (alertsContext.flags.is_loading) {
	// 	return (
	// 		<GroupedListSkeleton groupCount={3} itemCount={2} itemSkeleton={<AlertsListItemSkeleton />} />
	// 	);
	// }

	if (allAlertsGroupedByMunicipality.length > 0) {
		return (
			allAlertsGroupedByMunicipality.map(alertGroup => (
				<GroupedListItem key={alertGroup.start_date} title={alertGroup.start_date}>
					<Accordion>
						{alertGroup.alerts.map(alert => (
							<Accordion.Item key={alert._id} value={alert._id}>
								<Accordion.Control>{alert._id}</Accordion.Control>
								<Accordion.Panel>
									<AlertListItem key={alert._id} data={alert} />
								</Accordion.Panel>
							</Accordion.Item>

						))}
					</Accordion>
				</GroupedListItem>
			))
		);
	}

	// return (
	// 	<AlertsListEmpty />
	// );

	//
}
