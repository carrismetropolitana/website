/* * */

import { StoresListContextProvider } from '@/contexts/StoresList.context';

/* * */

export default function Layout({ children }) {
	return (
		<StoresListContextProvider>
			{children}
		</StoresListContextProvider>
	);
}
