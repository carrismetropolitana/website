/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { RegularListItem } from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { StopDisplay } from '@/components/stops/StopDisplay';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { useTranslations } from 'next-intl';
import { ViewportList } from 'react-viewport-list';

/* * */

export function StopsListViewAll() {
	//

	//
	// A. Setup variables

	const stopsListContext = useStopsListContext();
	const environmentContext = useEnvironmentContext();
	const t = useTranslations('stops.StopsListViewAll');

	//
	// B. Render components

	if (!stopsListContext.data.filtered.length) {
		return (
			<Surface variant="persistent" forceOverflow>
				<Section>
					<NoDataLabel text={t('no_data')} withMinHeight />
				</Section>
			</Surface>
		);
	}

	return (
		<Surface variant="persistent" forceOverflow>
			<Section>
				<ViewportList itemMargin={0} items={stopsListContext.data.filtered}>
					{item => (
						<RegularListItem key={item.id} href={environmentContext.actions.getNormalizedHref(`/stops/${item.id}`)}>
							<StopDisplay stopData={item} />
						</RegularListItem>
					)}
				</ViewportList>
			</Section>
		</Surface>
	);

	//
}
