/* * */

import { StopsListContextProvider } from '@/contexts/StopsList.context';

/* * */

export default function Layout({ children }) {
	return (
		<StopsListContextProvider>
			{children}
		</StopsListContextProvider>
	);
}
