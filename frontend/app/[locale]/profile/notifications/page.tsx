/* * */

import NotificationsPage from '@/components/profile/notifications/Page';
import { LinesListContextProvider } from '@/contexts/LinesList.context';
import { StopsListContextProvider } from '@/contexts/StopsList.context';
/* * */

export default function Page() {
	return (
		<LinesListContextProvider>
			<StopsListContextProvider>
				<NotificationsPage />
			</StopsListContextProvider>
		</LinesListContextProvider>
	);
}
