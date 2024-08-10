/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import RegularListItem from '@/components/layout/RegularListItem';
import Section from '@/components/layout/Section';
import LineDisplay from '@/components/lines/LineDisplay';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.FavoritesList');
	const linesContext = useLinesListContext();

	//
	// B. Render components

	if (!linesContext.data.favorites.length) {
		return <NoDataLabel text={t('no_favorites')} withMinHeight />;
	}

	return (
		<Section childrenWrapperStyles={styles.container} withChildrenPadding={false} withTopPadding={false}>
			{linesContext.data.favorites.map(line => (
				<RegularListItem key={line.line_id} href={`/lines/${line.line_id}`}>
					<LineDisplay line={line} />
				</RegularListItem>
			))}
		</Section>
	);

	//
}
