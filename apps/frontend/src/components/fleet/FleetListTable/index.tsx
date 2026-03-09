import { FleetRow } from '@/components/fleet/FleetRow';
import { useFleetListContext } from '@/contexts/FleetList.context';
import { ViewportList } from 'react-viewport-list';

import styles from './styles.module.css';

export function FleetListTable() {
	const fleetListContext = useFleetListContext();

	return (
		<div className={styles.table}>
			<div className={styles.header}>
				<FleetRow isHeader={true} />
			</div>
			<div className={styles.body}>
				{fleetListContext.flags.is_loading && [200, 120, 180, 200, 100, 120, 250, 120, 130, 220, 90].map((width, index) => (
					<FleetRow key={index} width={width} />
				))}
				{!fleetListContext.flags.is_loading && (
					<ViewportList items={fleetListContext.data.filtered}>
						{vehicle => <FleetRow key={vehicle.id} vehicleData={vehicle} />}
					</ViewportList>
				)}
			</div>
		</div>
	);
}
