/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { RegularListItem } from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LineDisplay } from '@/components/lines/LineDisplay';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { useTranslations } from 'next-intl';
import { ViewportList } from 'react-viewport-list';

/* * */

export function LinesListViewAll() {
	//

	//
	// A. Setup variables

	const linesListContext = useLinesListContext();
	const t = useTranslations('lines.LinesListViewAll');

	//
	// B. Render components

	if (!linesListContext.data.filtered.length) {
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
				<ViewportList itemMargin={0} items={linesListContext.data.filtered}>
					{item => (
						<RegularListItem key={item.id} href={`/lines/${item.id}`}>
							<LineDisplay lineData={item} />
						</RegularListItem>
					)}
				</ViewportList>
			</Section>
		</Surface>
	);

	//
}
