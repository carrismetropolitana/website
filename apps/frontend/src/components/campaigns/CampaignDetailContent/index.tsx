'use client';
/* * */

import type { CampaignData } from '@/types/campaign.types';

import { CampaignLayoutRenderer } from '@/components/campaigns/CampaignLayoutRenderer';
import { useDebugContext } from '@/contexts/Debug.context';

import styles from './styles.module.css';

/* * */

interface CampaignDetailContentProps {
	data: CampaignData
}

/* * */

export function CampaignDetailContent({ data }: CampaignDetailContentProps) {
	const layout = data.layout ?? [];
	const debugContext = useDebugContext();

	return (
		<section className={styles.content}>
			<CampaignLayoutRenderer blocks={layout} />

			{debugContext.flags.is_debug_mode && (
				<details>
					<summary>Raw Campaign JSON</summary>
					<pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
				</details>
			)}
		</section>
	);
}
