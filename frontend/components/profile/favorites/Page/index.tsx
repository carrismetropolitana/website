'use client';

/* * */

import Section from '@/components/layout/Section';
import LinesListViewFavorites from '@/components/lines/LinesListViewFavorites';
import PageToolbar from '@/components/profile/favorites/PageToolbar';
import { StopsListViewFavorites } from '@/components/stops/StopsListViewFavorites';
import { useProfileContext } from '@/contexts/Profile.context';
import { useTranslations } from 'next-intl';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.Page');
	const profileContext = useProfileContext();

	//
	// B. Render components

	return (
		<>
			<Section heading={t('heading')} withTopBorder={false} />
			<PageToolbar />
			{(!profileContext.flags.is_loading && profileContext.filters.favorites === 'lines') && <LinesListViewFavorites />}
			{(!profileContext.flags.is_loading && profileContext.filters.favorites === 'stops') && <StopsListViewFavorites />}
		</>
	);

	//
}
