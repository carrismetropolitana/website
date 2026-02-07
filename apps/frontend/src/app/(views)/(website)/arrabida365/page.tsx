/* * */
import { ArrabidaPage } from '@/components/arrabida/ArrabidaPage';
import { AlertsContextProvider } from '@/contexts/Alerts.context';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { LinesListContextProvider } from '@/contexts/LinesList.context';
import { type Metadata } from 'next';

/* * */
export const metadata: Metadata = {
	description: 'Este projeto tem como objetivo promover a mobilidade sustentável na Serra da Arrábida.',
	openGraph: {
		images: [{ url: '/assets/arrabidas/arrabida_365_map.png' }],
	},
	title: 'CMetropolitana | Arrabida365',
};
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
