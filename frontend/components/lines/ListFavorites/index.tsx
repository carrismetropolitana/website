/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import RegularListItem from '@/components/layout/RegularListItem';
import Section from '@/components/layout/Section';
import LineDisplay from '@/components/lines/LineDisplay';
import { useProfileContext } from '@/contexts/ProfileContext';
import { useLinesContext } from '@/contexts/lines.context';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.FavoritesList');

	const profileContext = useProfileContext();
	const linesContext = useLinesContext();

	//
	// B. Transform data

	const favoriteLines = useMemo(() => {
		if (!linesContext.data || !linesContext.data.raw) return [];
		return linesContext.data.raw.filter(line => profileContext.profile.favoriteLines.includes(line.line_id));
	}, []);

	//
	// C. Render components

	if (!favoriteLines.length) {
		return <NoDataLabel text={t('no_favorites')} withMinHeight />;
	}

	return (
		<Section childrenWrapperStyles={styles.container} withChildrenPadding={false} withTopPadding={false}>
			{favoriteLines.map(line => (
				<RegularListItem key={line.line_id} href={`/lines/${line.line_id}`}>
					<LineDisplay line={line} />
				</RegularListItem>
			))}
		</Section>
	);

	//
}
