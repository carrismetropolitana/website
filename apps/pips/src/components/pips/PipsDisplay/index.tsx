'use client';

import { StopsDetailContent } from '@/components/stops/StopsDetailContent';
import { StopsDetailContextProvider } from '@/contexts/StopsDetail.context';
import { useStopsPipContext } from '@/contexts/StopsPip.context';

export function PipsDisplay() {
	const stopsPipContext = useStopsPipContext();

	return (
		<>
			{stopsPipContext.data.stops.map(stop =>
				(
					<StopsDetailContextProvider key={stop.id} maxLines={stopsPipContext.filters.max_lines} stopId={stop.id}>
						<StopsDetailContent size="lg" stopName={stop.long_name} />
					</StopsDetailContextProvider>
				),
			)}
		</>
	);
}
