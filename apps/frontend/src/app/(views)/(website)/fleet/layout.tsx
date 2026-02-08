/* * */

import { FleetContextProvider } from '@/contexts/Fleet.context';
import { FleetListContextProvider } from '@/contexts/FleetList.context';
import { type Metadata } from 'next';

/* * */

export const metadata: Metadata = {
	description: 'Explore a frota completa da CMetropolitana.',
	title: 'CMetropolitana | Frota',
};

/* * */

export default function Layout({ children }) {
	return (
		<FleetContextProvider>
			<FleetListContextProvider>
				{children}
			</FleetListContextProvider>
		</FleetContextProvider>
	);
}
