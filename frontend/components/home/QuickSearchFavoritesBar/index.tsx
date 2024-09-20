'use client';

/* * */

import type { Line } from '@/types/lines.types';

import LineBadge from '@/components/common/LineBadge';
import Loader from '@/components/common/Loader';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

const DISPLAY_LIMIT = 5;

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.QuickSearchFavoritesBar');

	const router = useRouter();

	const profileContext = useProfileContext();
	const alertsContext = useAlertsContext();

	//
	// B. Fetch data

	const { data: allLinesData, isLoading: allLinesLoading } = useSWR('https://api.carrismetropolitana.pt/v2/lines');

	//
	// C. Transform data

	const favoriteLinesData: { data: Line, has_alert: boolean }[] = useMemo(() => {
		// Return early if data is not available
		if (!allLinesData || !profileContext.data.profile?.favorite_lines?.length) return [];
		// Filter all lines to only include favorited lines
		const filteredFavoriteLines = allLinesData.filter((lineData: Line) => profileContext.data.profile?.favorite_lines?.includes(lineData.line_id));
		const sortedFavoriteLines = filteredFavoriteLines.sort((a: Line, b: Line) => a.short_name.localeCompare(b.short_name));
		// Extend array with check if any of these lines have active alerts
		const extendedFavoriteLinesWithAlerts = sortedFavoriteLines.map((lineData: Line) => {
			return {
				data: lineData,
				has_alert: alertsContext.actions.getSimplifiedAlertsByLineId(lineData.line_id).length > 0,
			};
		});
		// Return extended array
		return extendedFavoriteLinesWithAlerts;
		//
	}, [allLinesData, profileContext.data.profile?.favorite_lines]);

	//
	// D. Handle actions

	const handleClick = (lineId: string) => {
		router.push(`/lines/${lineId}`);
	};

	//
	// E. Render Components

	if (allLinesLoading || profileContext.flags.is_loading) {
		return (
			<div className={styles.container}>
				<Loader size={26} visible />
			</div>
		);
	}

	if (favoriteLinesData.length === 0) {
		return (
			<div className={styles.container}>
				<p className={styles.emptyMessage}>{t('empty')}</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{favoriteLinesData.slice(0, DISPLAY_LIMIT).map(favoriteLine => (
				<LineBadge
					key={favoriteLine.data.line_id}
					line={favoriteLine.data}
					onClick={() => handleClick(favoriteLine.data.line_id)}
					withAlertIcon={favoriteLine.has_alert}
				/>
			))}
			{favoriteLinesData.length > DISPLAY_LIMIT && (
				<Link className={styles.more}href="/profile/favorites">
					{t('more', { count: favoriteLinesData.length - DISPLAY_LIMIT })}
				</Link>
			)}
		</div>
	);

	//
}
