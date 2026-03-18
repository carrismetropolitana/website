/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { RegularListItem } from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { StopDisplay } from '@/components/stops/StopDisplay';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { useTranslations } from 'next-intl';

/* * */

export function StopsListViewFavorites() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsListViewFavorites');
	const stopsListContext = useStopsListContext();
	const environmentContext = useEnvironmentContext();

	//
	// B. Render components

	if (!stopsListContext.data.favorites.length) {
		return (
			<Surface variant="persistent">
				<Section>
					<NoDataLabel text={t('no_favorites')} withMinHeight />
				</Section>
			</Surface>
		);
	}

	return (
		<Surface variant="persistent" forceOverflow>
			<Section>
				{stopsListContext.data.favorites.map(stop => (
					<RegularListItem key={stop.id} href={environmentContext.actions.getNormalizedHref(`/stops/${stop.id}`)}>
						<StopDisplay stopData={stop} />
					</RegularListItem>
				))}
			</Section>
		</Surface>
	);

	//
}
