'use client';

/* * */

import type { HubLine } from '@tmlmobilidade/go-types-public-info';

import { Loader } from '@/components/common/Loader';
import { LineBadge } from '@/components/lines/LineBadge';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

const DISPLAY_LIMIT = 5;

/* * */

interface FavoriteItem {
	has_alert: boolean
	line: HubLine
}

/* * */

export function QuickSearchFavoritesBar() {
	//

	//
	// A. Setup variables

	const router = useRouter();

	const t = useTranslations('home.QuickSearchFavoritesBar');

	const profileContext = useProfileContext();
	const alertsContext = useAlertsContext();
	const linesContext = useLinesContext();

	//
	// B. Transform data

	const favoriteItemsData: FavoriteItem[] | undefined = useMemo(() => {
		// Skip if data is not yet available
		if (linesContext.flags.is_loading || profileContext.flags.is_loading) return;
		// Return empty array if user has no favorite lines
		if (!profileContext.data.favorite_lines) return [];
		// Filter all lines to only include favorited lines
		const filteredFavoriteLines = linesContext.data.lines.filter(lineData => profileContext.data.favorite_lines?.includes(lineData._id));
		const sortedFavoriteLines = filteredFavoriteLines.sort((a, b) => a.short_name.localeCompare(b.short_name));
		// Extend array with check if any of these lines have active alerts
		const extendedFavoriteLinesWithAlerts = sortedFavoriteLines.map((lineData) => {
			return {
				has_alert: alertsContext.actions.getAlertsByLineId(lineData._id).length > 0,
				line: lineData,
			};
		});
		// Return extended array
		return extendedFavoriteLinesWithAlerts;
		//
	}, [linesContext.flags.is_loading, linesContext.data.lines, profileContext.flags.is_loading, profileContext.data.favorite_lines]);

	//
	// C. Handle actions

	const handleClick = (lineId: string) => {
		router.push(`/lines/${lineId}`);
	};

	//
	// D. Render components

	if (!favoriteItemsData) {
		return (
			<div className={styles.container}>
				<Loader size="sm" visible />
			</div>
		);
	}

	if (favoriteItemsData.length === 0) {
		return (
			<div className={styles.container}>
				<p className={styles.emptyMessage}>{t('empty')}</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{favoriteItemsData.slice(0, DISPLAY_LIMIT).map(favoriteLine => (
				<LineBadge
					key={favoriteLine.line._id}
					lineData={favoriteLine.line}
					onClick={() => handleClick(favoriteLine.line._id)}
					withAlertIcon={favoriteLine.has_alert}
				/>
			))}
			{favoriteItemsData.length > DISPLAY_LIMIT && (
				<Link className={styles.more}href="/profile/favorites">
					{t('more', { count: favoriteItemsData.length - DISPLAY_LIMIT })}
				</Link>
			)}
		</div>
	);

	//
}
