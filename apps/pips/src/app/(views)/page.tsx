/* * */

import { PipsHome } from '@/components/pips/PipsHome';
import { StopsPipContextProvider } from '@/contexts/StopsPip.context';

export default async function Page() {
	return (
		<StopsPipContextProvider>
			<PipsHome />
		</StopsPipContextProvider>
	);
}
