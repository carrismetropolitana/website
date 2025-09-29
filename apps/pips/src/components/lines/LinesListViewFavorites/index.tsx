/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { RegularListItem } from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LineDisplay } from '@/components/lines/LineDisplay';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { useTranslations } from 'next-intl';

/* * */

export function LinesListViewFavorites() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesListViewFavorites');
	const linesListContext = useLinesListContext();

	//
	// B. Render components

	if (!linesListContext.data.favorites.length) {
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
				{linesListContext.data.favorites.map(line => (
					<RegularListItem key={line.id} href={`/lines/${line.id}`}>
						<LineDisplay lineData={line} />
					</RegularListItem>
				))}
			</Section>
		</Surface>
	);

	//
}
