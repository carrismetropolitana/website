'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import StoresListGroups from '@/components/stores/StoresListGroups';
import StoresListMap from '@/components/stores/StoresListMap';
import StoresListToolbar from '@/components/stores/StoresListToolbar';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<>
			<StoresListToolbar />
			<Surface>
				<Section>
					<div className={styles.contentWrapper}>
						<div className={styles.groupsWrapper}>
							<StoresListGroups />
						</div>
						<div className={styles.mapWrapper}>
							<StoresListMap />
						</div>
					</div>
				</Section>
			</Surface>
		</>
	);
}
