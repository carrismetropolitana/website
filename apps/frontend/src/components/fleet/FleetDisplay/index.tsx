/* * */

import type { Vehicle } from '@carrismetropolitana/api-types/vehicles';

import { LiveIcon } from '@/components/common/LiveIcon';
import { LineBadge } from '@/components/lines/LineBadge';
import { useFleetContext } from '@/contexts/Fleet.context';
import { Skeleton } from '@mantine/core';
import { IconCircleCheck, IconCircleX, IconCreditCard, IconWifiOff } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	isHeader?: boolean
	vehicleData?: Vehicle
	width?: number
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

export function FleetDisplay({ isHeader, vehicleData, width = 200 }: Props) {
	//

	const t = useTranslations('fleet');
	const propulsionT = useTranslations('options.VehiclePropulsion');

	const fleetContext = useFleetContext();

	function getVehicleStatus(vehicleData: Vehicle) {
		const tripId = vehicleData.trip_id;
		if (!tripId) return (<div className={styles.statusDiv}><IconWifiOff color="red" /><span>{t('FleetList.status.no_data')}</span></div>);
		const lastPing = vehicleData.timestamp;
		const now = Date.now() / 1000;

		// If last ping is from over 7 days ago
		if (lastPing < (now - 604_800)) {
			return (<span>{t('FleetList.status.inactive')}</span>);
		}

		const currentOperationalDate = fleetContext.actions.getOperationalDate().getTime() / 1000;

		if (lastPing < (currentOperationalDate)) {
			return (<div className={[styles.statusDiv, styles.pastDeparture].join(' ')}><span>{t('FleetList.status.activeWeek', { days: Math.floor((currentOperationalDate - lastPing) / 86_400) + 1 })}</span></div>);
		}

		if (lastPing > currentOperationalDate && lastPing < (now - 3600)) return (<div className={[styles.statusDiv, styles.pastDeparture].join(' ')}><span>{t('FleetList.status.activeToday', { hours: Math.floor((now - lastPing) / 3600) })}</span><LineBadge lineId={vehicleData.line_id || 'CP'} shortName={(vehicleData.line_id === '1998' || vehicleData.line_id === '1999') ? 'CP' : vehicleData.line_id} /></div>);

		if (lastPing > currentOperationalDate && lastPing < (now - 120)) return (<div className={[styles.statusDiv, styles.pastDeparture].join(' ')}><span>{t('FleetList.status.activeHour', { mins: Math.floor((now - lastPing) / 60) })}</span><LineBadge lineId={vehicleData.line_id || 'CP'} shortName={(vehicleData.line_id === '1998' || vehicleData.line_id === '1999') ? 'CP' : vehicleData.line_id} /></div>);

		return (<div className={styles.statusDiv}><LiveIcon /><span>{t('FleetList.status.activeNow')}</span><LineBadge lineId={vehicleData.line_id || 'CP'} shortName={(vehicleData.line_id === '1998' || vehicleData.line_id === '1999') ? 'CP' : vehicleData.line_id} /></div>);
	}

	if (isHeader) {
		return (
			<>
				<tr className={styles.tableHeader}>
					<th rowSpan={2}># Frota</th>
					<th rowSpan={2}>Operador</th>
					<th rowSpan={2}><IconCreditCard /></th>
					<th rowSpan={2}>Propulsão</th>
					<th rowSpan={2}>Modelo</th>
					<th colSpan={3}>Capacidade</th>
					<th className={styles.tableHeaderLastChild} rowSpan={2}>Estado</th>
				</tr>
				<tr className={styles.tableHeader}>
					<th>S</th>
					<th>P</th>
					<th>Total</th>
				</tr>
			</>
		);
	}

	if (vehicleData) {
		return (
			<tr className={styles.tableCell}>
				<td>{vehicleData.id}</td>
				<td>{getOperatorFromAgencyId(vehicleData.agency_id)}</td>
				<td>{vehicleData.contactless ? <IconCircleCheck color="green" /> : <IconCircleX color="red" />}</td>
				<td>{vehicleData.propulsion ? propulsionT(`${vehicleData.propulsion}`) : 'N/A'}</td>
				<td>{(vehicleData.make ? (vehicleData.make + ' - ' + vehicleData.model) : 'Desconhecido')}</td>
				<td>{vehicleData.capacity_seated}</td>
				<td>{vehicleData.capacity_standing}</td>
				<td>{vehicleData.capacity_total}</td>
				<td>{getVehicleStatus(vehicleData)}</td>
			</tr>
		);
	}

	return (
		<tr className={styles.tableCell}>
			<td><Skeleton height={24} width={50} /></td>
			<td><Skeleton height={24} width={150} /></td>
			<td><Skeleton height={24} width={50} /></td>
			<td><Skeleton height={24} width={150} /></td>
			<td><Skeleton height={24} width={width} /></td>
			<td><Skeleton height={24} width={100} /></td>
		</tr>
	);

	//
}
