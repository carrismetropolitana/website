/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import RegularListItem from '@/components/layout/RegularListItem';
import Section from '@/components/layout/Section';
import StopDisplay from '@/components/stops/StopDisplay';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { RoutesSchedule } from '@/utils/routes';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.FavoritesList');
	const stopsContext = useStopsListContext();

	//
	// B. Render components

	if (!stopsContext.data.favorites.length) {
		return (
			<Section childrenWrapperStyles={styles.container} withChildrenPadding={false} withTopPadding={false}>
				<NoDataLabel text={t('no_favorites')} withMinHeight />
			</Section>
		);
	}

	return (
		<Section childrenWrapperStyles={styles.container} withChildrenPadding={false} withTopPadding={false}>
			{stopsContext.data.favorites.map(stop => (
				<RegularListItem key={stop.id} href={`${RoutesSchedule.STOPS}/${stop.id}`}>
					<StopDisplay stop={stop} />
				</RegularListItem>
			))}
		</Section>
	);

	//
}
