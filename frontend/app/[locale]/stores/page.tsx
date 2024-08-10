/* * */

import StoresPage from '@/components/stores/Page';
import { StoresListContextProvider } from '@/contexts/StoresList.context';

/* * */

export default function Page() {
	return (
		<StoresListContextProvider>
			<StoresPage />
		</StoresListContextProvider>
	);
}
