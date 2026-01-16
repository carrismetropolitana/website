'use client';

import { AutoScrollContainer } from '@/components/common/AutoScrollContainer';
import { StopsDetailContent } from '@/components/stops/StopsDetailContent';
import { StopsDetailContextProvider } from '@/contexts/StopsDetail.context';
import { useStopsPipContext } from '@/contexts/StopsPip.context';

export function PipsDisplay() {
	const stopsPipContext = useStopsPipContext();

	return (
		<AutoScrollContainer
			enabled={stopsPipContext.display.auto_scroll}
			pauseDuration={stopsPipContext.display.scroll_pause}
			scale={stopsPipContext.display.scale}
			speed={stopsPipContext.display.scroll_speed}
		>
			{stopsPipContext.data.stops.map(stop =>
				(
					<StopsDetailContextProvider key={stop.id} maxLines={stopsPipContext.filters.max_lines} stopId={stop.id}>
						<StopsDetailContent size="lg" stopName={stop.long_name} />
					</StopsDetailContextProvider>
				),
			)}
		</AutoScrollContainer>
	);
}
