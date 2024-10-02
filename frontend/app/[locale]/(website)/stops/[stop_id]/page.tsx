/* * */

import { StopsDetail } from '@/components/stops/StopsDetail';
import { StopsSingleContextProvider } from '@/contexts/StopsSingle.context';

/* * */

export default function Page({ params: { stop_id } }) {
	return (
		<StopsSingleContextProvider stopId={stop_id}>
			<StopsDetail />
		</StopsSingleContextProvider>
	);
}
