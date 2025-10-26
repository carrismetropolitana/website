'use client';

import { Loader } from '@/components/common/Loader';
import { useStopsPipContext } from '@/contexts/StopsPip.context';

import { PipsConfig } from '../PipsConfig';
import { PipsDisplay } from '../PipsDisplay';

export function PipsHome() {
	//

	//
	// A. Setup variables

	const stopsPipContext = useStopsPipContext();

	//
	// B. Render components

	if (stopsPipContext.flags.is_loading) {
		return (
			<Loader visible />
		);
	}

	return (
		<>
			{stopsPipContext.data.stops.length
				? <PipsDisplay />
				: <PipsConfig />}
		</>
	);
}
