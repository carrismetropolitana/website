/* * */

import RegularListItem from '@/components/layout/RegularListItem';
import Section from '@/components/layout/Section';
import StopDisplay from '@/components/stops/StopDisplay';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function StopsListViewSkeleton() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.FavoritesList');
	const stopsContext = useStopsListContext();

	//
	// B. Render components

	return (
		<Section withTopBorder={false} withTopPadding={false}>
			{[200, 120, 180, 200, 100, 120, 250, 120, 130, 220, 90].map((width, index) => (
				<RegularListItem key={index} href="#">
					<StopDisplay width={width} />
				</RegularListItem>
			))}
		</Section>
	);

	//
}
