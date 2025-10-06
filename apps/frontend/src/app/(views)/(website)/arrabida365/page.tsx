/* * */
import { ArrabidaPage } from '@/components/arrabida/ArrabidaPage';
import { AlertsContextProvider } from '@/contexts/Alerts.context';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { LinesListContextProvider } from '@/contexts/LinesList.context';

/* * */

export default function Page() {
	return (
		<LinesListContextProvider>
			<LinesDetailContextProvider lineId="123">
				<AlertsContextProvider>
					<ArrabidaPage />
				</AlertsContextProvider>
			</LinesDetailContextProvider>
		</LinesListContextProvider>
	);
}
