/* * */

import type { Vehicle } from '@carrismetropolitana/api-types/vehicles';

import { LiveIcon } from '@/components/common/LiveIcon';
import { LineBadge } from '@/components/lines/LineBadge';
import { useFleetContext } from '@/contexts/Fleet.context';
import { Skeleton } from '@mantine/core';
import { IconCircleCheck, IconCircleX, IconCreditCard, IconWifiOff } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	isHeader?: boolean
	vehicleData?: Vehicle
	width?: number
}

function useWindowWidth() {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handler = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handler);
		return () => window.removeEventListener('resize', handler);
	}, []);

	return width;
}

/* * */

function getOperatorFromAgencyId(agency_id) {
	switch (agency_id) {
		case '41':
			return 'V. Alvorada';
		case '42':
			return 'RL';
		case '43':
			return 'TST';
		case '44':
			return 'Alsa Todi';
		default:
			return 'ERRO';
	}
}

export function FleetRow({ isHeader, vehicleData }: Props) {
	//

	const t = useTranslations('fleet');
	const propulsionT = useTranslations('options.VehiclePropulsion');

	const collumns = [
		{
			key: 'id',
			label: t('FleetTable.header.fleetId'),
			width: '80px',
		},
		{
			key: 'agency',
			label: t('FleetTable.header.agency'),
			minWidth: 651, // 650px and lower is when the website's layout changes considerably, losing the "floating" surfaces
			width: '100px',
		},
		{
			key: 'contactless',
			label: (<IconCreditCard />),
			width: '50px',
		},
		{
			key: 'propulsion',
			label: t('FleetTable.header.propulsion'),
			minWidth: 550,
			width: '100px',
		},
		{
			key: 'model',
			label: t('FleetTable.header.model'),
			minWidth: 1000,
			width: '300px',
		},
		{
			key: 'capacity',
			label: t('FleetTable.header.capacity'),
			minWidth: 1200,
			width: '150px',
		},
		{
			key: 'status',
			label: t('FleetTable.header.status'),
			width: '1fr',
		},
	];

	const fleetContext = useFleetContext();

	function getVehicleStatus(vehicleData: Vehicle) {
		const tripId = vehicleData.trip_id;
		if (!tripId) return (<div className={styles.statusDiv}><IconWifiOff color="red" /><span>{t('FleetTable.status.no_data')}</span></div>);
		const lastPing = vehicleData.timestamp;
		const now = Date.now() / 1000;

		// If last ping is from over 7 days ago
		if (lastPing < (now - 604_800)) {
			return (<span>{t('FleetTable.status.inactive')}</span>);
		}

		const currentOperationalDate = fleetContext.actions.getOperationalDate().getTime() / 1000;

		if (lastPing < (currentOperationalDate)) {
			return (<div className={[styles.statusDiv, styles.pastDeparture].join(' ')}><span>{t('FleetTable.status.activeWeek', { days: Math.floor((currentOperationalDate - lastPing) / 86_400) + 1 })}</span></div>);
		}

		if (lastPing > currentOperationalDate && lastPing < (now - 3600)) return (<div className={[styles.statusDiv, styles.pastDeparture].join(' ')}><span>{t('FleetTable.status.activeToday', { hours: Math.floor((now - lastPing) / 3600) })}</span><LineBadge lineId={vehicleData.line_id || 'CP'} shortName={(vehicleData.line_id === '1998' || vehicleData.line_id === '1999') ? 'CP' : vehicleData.line_id} /></div>);

		if (lastPing > currentOperationalDate && lastPing < (now - 120)) return (<div className={[styles.statusDiv, styles.pastDeparture].join(' ')}><span>{t('FleetTable.status.activeHour', { mins: Math.floor((now - lastPing) / 60) })}</span><LineBadge lineId={vehicleData.line_id || 'CP'} shortName={(vehicleData.line_id === '1998' || vehicleData.line_id === '1999') ? 'CP' : vehicleData.line_id} /></div>);

		return (<div className={styles.statusDiv}><LiveIcon /><span>{t('FleetTable.status.activeNow')}</span><LineBadge lineId={vehicleData.line_id || 'CP'} shortName={(vehicleData.line_id === '1998' || vehicleData.line_id === '1999') ? 'CP' : vehicleData.line_id} /></div>);
	}

	const width = useWindowWidth();
	const visibleColumns = collumns.filter(column => (column.minWidth ? column.minWidth <= width : true));

	if (isHeader) {
		return (
			<div className={styles.row} style={{ gridTemplateColumns: visibleColumns.map(col => col.width).join(' ') }}>
				{visibleColumns.map(col => (<div key={col.key}>{col.label}</div>))}
			</div>
		);
	}

	if (vehicleData) {
		const [showInfo, setShowInfo] = useState(false);
		function toggleInfo() {
			setShowInfo(!showInfo);
		}

		return (
			<>
				<div className={styles.row} onClick={toggleInfo} style={{ gridTemplateColumns: visibleColumns.map(col => col.width).join(' ') }}>
					{visibleColumns.find(col => col.key === 'id') && <div>{vehicleData.id}</div>}
					{visibleColumns.find(col => col.key === 'agency') && <div>{getOperatorFromAgencyId(vehicleData.agency_id)}</div>}
					{visibleColumns.find(col => col.key === 'contactless') && <div>{vehicleData.contactless ? <IconCircleCheck color="green" /> : <IconCircleX color="red" />}</div>}
					{visibleColumns.find(col => col.key === 'propulsion') && <div>{vehicleData.propulsion ? propulsionT(`${vehicleData.propulsion}`) : 'N/A'}</div>}
					{visibleColumns.find(col => col.key === 'model') && <div>{(vehicleData.make ? (vehicleData.make + ' - ' + vehicleData.model) : t('FleetTable.unknown'))}</div>}
					{visibleColumns.find(col => col.key === 'capacity') && <div>{vehicleData.capacity_total ? `${vehicleData.capacity_total} (${vehicleData.capacity_seated}+${vehicleData.capacity_standing})` : t('FleetTable.unknown')}</div>}
					{visibleColumns.find(col => col.key === 'status') && <div>{getVehicleStatus(vehicleData)}</div>}
				</div>

			</>
		);
	}

	return (
		<div className={styles.row} style={{ gridTemplateColumns: collumns.map(col => col.width).join(' ') }}>
			<div><Skeleton height={24} width={50} /></div>
			<div><Skeleton height={24} width={50} /></div>
			<div><Skeleton height={24} width={50} /></div>
			<div><Skeleton height={24} width={50} /></div>
			<div><Skeleton height={24} width={50} /></div>
			<div><Skeleton height={24} width={50} /></div>
			<div><Skeleton height={24} width={50} /></div>
		</div>
	);

	//
}
