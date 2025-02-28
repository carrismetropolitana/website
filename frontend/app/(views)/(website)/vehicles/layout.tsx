/* * */

import { VehiclesListContextProvider } from '@/contexts/VehiclesList.context';
import { type Metadata } from 'next';

/* * */

export const metadata: Metadata = {
	description: 'Explore todos os veículos da CMetropolitana em tempo real.',
	title: 'CMetropolitana | Frota',
};

/* * */

export default function Layout({ children }) {
	return (
		<VehiclesListContextProvider>
			{children}
		</VehiclesListContextProvider>
	);
}
