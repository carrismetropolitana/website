/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import RegularListItem from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import LineDisplay from '@/components/lines/LineDisplay';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { RoutesSchedule } from '@/utils/routes';
import { useTranslations } from 'next-intl';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesListViewFavorites');
	const linesContext = useLinesListContext();

	//
	// B. Render components

	if (!linesContext.data.favorites.length) {
		return (
			<Section>
				<NoDataLabel text={t('no_favorites')} withMinHeight />
			</Section>
		);
	}

	return (
		<Section>
			{linesContext.data.favorites.map(line => (
				<RegularListItem key={line.line_id} href={`${RoutesSchedule.LINES.route}/${line.line_id}`}>
					<LineDisplay line={line} />
				</RegularListItem>
			))}
		</Section>
	);

	//
}
