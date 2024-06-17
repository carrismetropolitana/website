'use client';

/* * */

import FrontendEncmItem from '@/components/FrontendEncmItem/FrontendEncmItem';
import { useMemo } from 'react';

import styles from './FrontendEncmGrid.module.css';

/* * */

export default function FrontendEncmGrid({ allEncmData, onSelectEncmId, selectedEncmId }) {
	//

	//
	// A. Transform data

	const allEncmGroupedByMunicipality = useMemo(() => {
		if (!allEncmData) return [];
		const groupedEncm = allEncmData.reduce((result, item) => {
			const existingGroup = result.find(group => group.id === item.municipality_id);
			if (existingGroup) {
				existingGroup.encm.push(item);
			}
			else {
				result.push({
					encm: [item],
					id: item.municipality_id,
					name: item.municipality_name,
				});
			}
			return result;
		}, []);
		const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
		const sortedGroups = groupedEncm.sort((a, b) => collator.compare(a.name, b.name));
		return sortedGroups;
	}, [allEncmData]);

	//
	// B. Render components

	return (
		<div className={styles.container}>
			{allEncmGroupedByMunicipality
			&& allEncmGroupedByMunicipality.map(group => (
				<div key={group.id} className={styles.groupWrapper}>
					<div className={styles.groupTitle}>
						<h2>{group.name}</h2>
					</div>
					<div key={group.id} className={styles.grid}>
						{group.encm && group.encm.map(encm => <FrontendEncmItem key={encm.id} encmData={encm} onSelectEncmId={onSelectEncmId} selectedEncmId={selectedEncmId} />)}
					</div>
				</div>
			),

			)}
		</div>
	);

	//
}