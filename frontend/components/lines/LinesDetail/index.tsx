/* * */

import LinesDetailAlerts from '@/components/lines/LinesDetailAlerts';
import LinesDetailHeader from '@/components/lines/LinesDetailHeader';
import LinesDetailMetrics from '@/components/lines/LinesDetailMetrics';
import LinesDetailPath from '@/components/lines/LinesDetailPath';
import LinesDetailToolbar from '@/components/lines/LinesDetailToolbar';

/* * */

export default function Component() {
	return (
		<>
			<LinesDetailHeader />
			<LinesDetailToolbar />
			<LinesDetailAlerts />
			<LinesDetailPath />
			<LinesDetailMetrics />
		</>
	);
}
