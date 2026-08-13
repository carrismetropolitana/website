'use client';

/* * */

import { AlertsListGroup } from '@/components/alerts/AlertsListGroup';
import { AlertsListToolbar } from '@/components/alerts/AlertsListToolbar';
import { useAlertsListContext } from '@/contexts/AlertsList.context';

import { AlertsListViewMap } from '../AlertsListViewMap';

/* * */

export function AlertsList() {
	//

	//
	// A. Setup variables

	const alertsListContext = useAlertsListContext();

	//
	// B. Render components

	return (
		<>
			<AlertsListToolbar />
			{alertsListContext.filters.by_date === 'map' ? <AlertsListViewMap /> : <AlertsListGroup />}
		</>
	);
}
