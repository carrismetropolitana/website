/* * */

import AlertsList from '@/components/alerts/AlertsList';
import { AlertsListContextProvider } from '@/contexts/AlertsList.context';

/* * */

export default function Page() {
	return (
		<AlertsListContextProvider>
			<AlertsList />
		</AlertsListContextProvider>
	);
}
