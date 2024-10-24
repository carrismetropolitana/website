'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LinesListViewFavorites } from '@/components/lines/LinesListViewFavorites';
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
		<Surface>
			<Section heading={t('heading')} withPadding />
			<PageToolbar />
			{(!profileContext.flags.is_loading && profileContext.filters.favorites === 'lines') && <LinesListViewFavorites />}
			{(!profileContext.flags.is_loading && profileContext.filters.favorites === 'stops') && <StopsListViewFavorites />}
		</Surface>
	);

	//
}
