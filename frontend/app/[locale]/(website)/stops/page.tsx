/* * */

import StopsPage from '@/components/stops/Page';
import { StopsListContextProvider } from '@/contexts/StopsList.context';

/* * */

export default function Page() {
	return (
		<StopsListContextProvider>
			<StopsPage />
		</StopsListContextProvider>
	);
}
