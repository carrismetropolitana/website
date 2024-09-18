/* * */

import StoresList from '@/components/stores/StoresList';
import { StoresListContextProvider } from '@/contexts/StoresList.context';

/* * */

export default function Page() {
	return (
		<StoresListContextProvider>
			<StoresList />
		</StoresListContextProvider>
	);
}
