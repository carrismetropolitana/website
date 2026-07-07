'use client';

/* * */

import { LicensePlate } from '@/components/common/LicensePlate';
import { TooltipIcon } from '@/components/common/TooltipIcon';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { LineBadge } from '@/components/lines/LineBadge';
import { LineName } from '@/components/lines/LineName';
import { useLinesContext } from '@/contexts/Lines.context';
import { useVehiclesDetailContext, VehiclesDetailContextProvider } from '@/contexts/VehiclesDetail.context';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { Table } from '@mantine/core';
import { IconBike, IconBikeOff, IconCreditCard, IconCreditCardOff, IconDisabled2, IconDisabledOff, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

function VehiclesListDetailsContent() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesListDetails');
	const optionLabels = useTranslations('options');

	const linesContext = useLinesContext();
	const vehiclesListContext = useVehiclesListContext();
	const vehiclesDetailContext = useVehiclesDetailContext();

	const { metadata, position } = vehiclesDetailContext.data;

	//
	// B. Fetch data

	const activeLineData = useMemo(() => {
		return linesContext.actions.getLineDataById(position?.line_id || '');
	}, [position?.line_id]);

	const rows = [
		{ label: 'ID', value: position?.vehicle_id },
		{ label: 'Lugares Sentados', value: metadata?.available_seats },
		{ label: 'Lugares em pé', value: metadata?.available_standing },
		{ label: 'Capacidade Total', value: metadata ? metadata.available_seats + metadata.available_standing : undefined },
		{ label: 'Marca', value: metadata?.make },
		{ label: 'Modelo', value: metadata?.model },
		{ label: 'Propulsão', value: metadata?.propulsion ? optionLabels(`VehiclePropulsion.${metadata.propulsion}`) : t('unknown') },
		{ label: 'Emission Class', value: metadata?.emission ? optionLabels(`VehicleEmissionClass.${metadata.emission}`) : t('unknown') },
		{ label: 'Estado Atual', value: position?.current_status },
		{ label: 'Trip ID', value: position?.trip_id || t('unknown') },
	];

	//
	// C. Render components

	return (
		<Section withGap withPadding>

			{position ? (
				<>
					<IconX className={styles.closeButton} onClick={() => vehiclesListContext.actions.updateSelectedVehicle(null)} />

					<div className={styles.dataWrapper}>
						<LineBadge lineData={activeLineData} size="lg" />
						<LineName align="center" lineData={activeLineData} size="lg" />

						<div className={styles.iconList}>
							<TooltipIcon icon={metadata?.bicycles ? <IconBike /> : <IconBikeOff />} label={metadata?.bicycles ? t('bikes_allowed') : t('no_bikes_allowed')} position="bottom" />
							<TooltipIcon icon={metadata?.wheelchair ? <IconDisabled2 /> : <IconDisabledOff />} label={metadata?.wheelchair ? t('wheelchair_accessible') : t('no_wheelchair_accessible')} position="bottom" />
							<TooltipIcon icon={metadata?.contactless ? <IconCreditCard /> : <IconCreditCardOff />} label={metadata?.contactless ? t('contactless') : t('no_contactless')} position="bottom" />
							{metadata?.license_plate && <LicensePlate value={metadata.license_plate} />}
						</div>

						<Table withRowBorders>
							<Table.Tbody>
								{rows.map(row => (
									<Table.Tr key={row.label}>
										<Table.Td className={styles.rowLabel}>{row.label}</Table.Td>
										<Table.Td className={styles.rowValue}>{row.value}</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table>

					</div>
				</>
			) : (
				<NoDataLabel text={t('no_data')} />
			)}
		</Section>
	);

	//
}

export function VehiclesListDetails() {
	const vehiclesListContext = useVehiclesListContext();

	return (
		<VehiclesDetailContextProvider vehicleId={vehiclesListContext.filters.selected_vehicle}>
			<VehiclesListDetailsContent />
		</VehiclesDetailContextProvider>
	);
}
