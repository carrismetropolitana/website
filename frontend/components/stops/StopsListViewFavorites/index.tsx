/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import RegularListItem from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { StopDisplay } from '@/components/stops/StopDisplay';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { RoutesSchedule } from '@/utils/routes';
import { useTranslations } from 'next-intl';

/* * */

export function StopsListViewFavorites() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsListViewFavorites');
	const stopsContext = useStopsListContext();

	//
	// B. Render components

	if (!stopsContext.data.favorites.length) {
		return (
			<Section>
				<NoDataLabel text={t('no_favorites')} withMinHeight />
			</Section>
		);
	}

	return (
		<Section>
			{stopsContext.data.favorites.map(stop => (
				<RegularListItem key={stop.id} href={`${RoutesSchedule.STOPS.route}/${stop.id}`}>
					<StopDisplay stop={stop} />
				</RegularListItem>
			))}
		</Section>
	);

	//
}