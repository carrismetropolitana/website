'use client';

/* * */

import Section from '@/components/layout/Section';
import FavoriteLines from '@/components/lines/ListFavorites';
import PageToolbar from '@/components/profile/favorites/PageToolbar';
import FavoriteStops from '@/components/stops/ListFavorites';
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
			{(!profileContext.flags.is_loading && profileContext.filters.favorites === 'lines') && <FavoriteLines />}
			{(!profileContext.flags.is_loading && profileContext.filters.favorites === 'stops') && <FavoriteStops />}
		</>
	);

	//
}
