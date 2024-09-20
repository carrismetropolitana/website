/* * */

import StopsDetail from '@/components/stops/StopDetail';
import { StopsListContextProvider } from '@/contexts/StopsList.context';
import { StopsSingleContextProvider } from '@/contexts/StopsSingle.context';

/* * */

export default function Page({ params: { stop_id } }) {
	return (
		<StopsListContextProvider>
			<StopsSingleContextProvider stopId={stop_id}>
				<StopsDetail />
			</StopsSingleContextProvider>
		</StopsListContextProvider>
	);
}
