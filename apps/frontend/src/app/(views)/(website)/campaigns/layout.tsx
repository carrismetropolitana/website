/* * */

import { CampaignsListContextProvider } from '@/contexts/CampaignsList.context';

/* * */

export default function Layout({ children }) {
	return (
		<CampaignsListContextProvider>
			{children}
		</CampaignsListContextProvider>
	);
}
