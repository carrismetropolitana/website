/* * */

import StoresPage from '@/components/stores/Page';
import { StoresListContextProvider } from '@/contexts/stores.list.context';

/* * */

export default function Page() {
	return (
		<StoresListContextProvider>
			<StoresPage />
		</StoresListContextProvider>
	);
}
