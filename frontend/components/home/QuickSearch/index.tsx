/* * */

import QuickSearchFavoritesBar from '@/components/home/QuickSearchFavoritesBar';
import QuickSearchWidget from '@/components/home/QuickSearchWidget';
import { Surface } from '@/components/layout/Surface';

/* * */

export default function Component() {
	return (
		<Surface variant="brand">
			<QuickSearchFavoritesBar />
			<QuickSearchWidget />
		</Surface>
	);
}
