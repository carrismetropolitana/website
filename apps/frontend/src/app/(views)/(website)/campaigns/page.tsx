/* * */

import { CampaignsList } from '@/components/campaigns/CampaignsList';
import { type Metadata } from 'next';

/* * */

export const metadata: Metadata = {
	description: 'Todas as campanhas da CMetropolitana.',
	title: 'CMetropolitana | Campanhas',
};

/* * */

export default function Page() {
	return <CampaignsList />;
}
