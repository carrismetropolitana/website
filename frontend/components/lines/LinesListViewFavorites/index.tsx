/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import RegularListItem from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import LineDisplay from '@/components/lines/LineDisplay';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { RoutesSchedule } from '@/utils/routes';
import { useTranslations } from 'next-intl';

/* * */

export function LinesListViewFavorites() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesListViewFavorites');
	const linesContext = useLinesListContext();

	//
	// B. Render components

	if (!linesContext.data.favorites.length) {
		return (
			<Surface>
				<Section>
					<NoDataLabel text={t('no_favorites')} withMinHeight />
				</Section>
			</Surface>
		);
	}

	return (
		<Surface forceOverflow>
			<Section>
				{linesContext.data.favorites.map(line => (
					<RegularListItem key={line.id} href={`${RoutesSchedule.LINES.route}/${line.id}`}>
						<LineDisplay line={line} />
					</RegularListItem>
				))}
			</Section>
		</Surface>
	);

	//
}
