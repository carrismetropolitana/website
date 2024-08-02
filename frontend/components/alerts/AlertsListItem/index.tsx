'use client';

/* * */

import type { Alert } from '@/types/alerts.types';

import { Accordion } from '@mantine/core';
// import AlertsListItemRealtime from '@/components/alerts/AlertsListItemRealtime';
import { IconMap, IconObjectScan } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface AlertsListItemProps {
	data: Alert
}

/* * */

export default function Component({ data }: AlertsListItemProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertsListItem');

	//
	// B. Transform data

	//
	// C. Render components

	return (
		<Accordion.Item value={data._id}>
			<Accordion.Control icon={<IconObjectScan />}>{data._id}{data._id}{data._id}{data._id}{data._id}</Accordion.Control>
			<Accordion.Panel>
				test
			</Accordion.Panel>
		</Accordion.Item>
	);

	//
}
