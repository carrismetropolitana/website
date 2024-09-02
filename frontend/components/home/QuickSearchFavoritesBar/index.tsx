'use client';

/* * */

import Loader from '@/components/common/Loader';
import LineBadge from '@/components/lines/LineBadge';
import { useProfileContext } from '@/contexts/Profile.context';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeQuickSearchFavoritesBar');
	const profileContext = useProfileContext();

	//
	// B. Fetch data

	const { data: allLinesData, isLoading: allLinesLoading } = useSWR('https://api.carrismetropolitana.pt/v2/lines');

	//
	// C. Transform data

	const favoriteLinesData = useMemo(() => {
		if (!allLinesData || !profileContext.data.profile?.favorite_lines?.length) {
			return [];
		};
		const filteredFavoriteLines = allLinesData.filter(line => profileContext.data.profile?.favorite_lines?.includes(line.line_id));
		const sortedFavoriteLines = filteredFavoriteLines.sort((a, b) => a.short_name.localeCompare(b.short_name));
		return sortedFavoriteLines;
	}, [allLinesData, profileContext.data.profile?.favorite_lines]);

	//
	// D. Render Components

	if (allLinesLoading || profileContext.flags.is_loading) {
		return (
			<div className={styles.container}>
				<Loader size={26} visible />
			</div>
		);
	}

	if (!allLinesData || !profileContext.data.profile || profileContext.data.profile.favorite_lines?.length === 0) {
		return (
			<div className={styles.container}>
				<p className={styles.emptyMessage}>{t('empty')}</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{favoriteLinesData.map(favoriteLine => (
				<LineBadge key={favoriteLine.line_id} line={favoriteLine} />
			))}
		</div>
	);

	//
}
