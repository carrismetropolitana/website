/* * */

import { Pip } from '@/components/pip';
import { StopsPipContextProvider } from '@/contexts/StopsPip.context';

export default async function Page() {
	return (
		<StopsPipContextProvider>
			<Pip />
		</StopsPipContextProvider>
	);
}
