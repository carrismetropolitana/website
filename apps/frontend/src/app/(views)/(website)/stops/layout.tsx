/* * */

import { StopsListContextProvider } from '@/contexts/StopsList.context';
import { type Metadata } from 'next';

/* * */

export const metadata: Metadata = {
	description: 'Descubra as paragens de autocarro da CMetropolitana.',
	title: 'CMetropolitana | Paragens',
};

/* * */

export default function Layout({ children }) {
	return (
		<StopsListContextProvider>
			{children}
		</StopsListContextProvider>
	);
}
