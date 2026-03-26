/* * */

import { StopsDetail } from '@/components/stops/StopsDetail';
import { StopsDetailContextProvider } from '@/contexts/StopsDetail.context';

/* * */

export default async function Page({ params }) {
	const { stop_id } = await params;
	return (
		<StopsDetailContextProvider stopId={stop_id}>
			<StopsDetail />
		</StopsDetailContextProvider>
	);
}
