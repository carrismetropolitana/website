/* * */

import FavoritesPage from '@/components/profile/favorites/Page';
import { LinesListContextProvider } from '@/contexts/LinesList.context';
import { StopsListContextProvider } from '@/contexts/StopsList.context';

/* * */

export default function Page() {
	return (
		<LinesListContextProvider>
			<StopsListContextProvider>
				<FavoritesPage />
			</StopsListContextProvider>
		</LinesListContextProvider>
	);
}
