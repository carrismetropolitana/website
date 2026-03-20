'use client';

/* * */

import { useDebugContext } from '@/contexts/Debug.context';
import { type GeneralStatusMessage } from '@carrismetropolitana/website-shared-types';
import { IconAlertOctagonFilled, IconCircleCheckFilled, IconInfoSquareFilled, IconTrafficCone } from '@tabler/icons-react';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function GeneralStatus() {
	//

	//
	// A. Fetch data

	const debugContext = useDebugContext();
	const { data: generalStatusData } = useSWR<GeneralStatusMessage[]>('/admin/public-api/general-status');

	const visibleMessages = useMemo(() => {
		if (!generalStatusData?.length) return [];
		return generalStatusData.filter(item => !item.is_debug || debugContext.flags.is_debug_mode);
	}, [generalStatusData, debugContext.flags.is_debug_mode]);

	//
	// B. Render components

	if (!visibleMessages.length) {
		return null;
	}

	return visibleMessages.map(item => (
		<div key={item._id} className={styles.container} data-severity={item.severity}>
			{item.severity === 'ok' && <IconCircleCheckFilled className={styles.icon} size={24} />}
			{item.severity === 'info' && <IconInfoSquareFilled className={styles.icon} size={24} />}
			{item.severity === 'warning' && <IconTrafficCone className={styles.icon} size={24} />}
			{item.severity === 'danger' && <IconAlertOctagonFilled className={styles.icon} size={24} />}
			<p className={styles.title}>{item.title}</p>
		</div>
	));

	//
}
