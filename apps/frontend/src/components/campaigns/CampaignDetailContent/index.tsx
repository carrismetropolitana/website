'use client';
/* * */

import type { CampaignData } from '@/types/campaign.types';

import { useDebugContext } from '@/contexts/Debug.context';
import { getLexicalRoot, useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface CampaignDetailContentProps {
	data: CampaignData
}

/* * */

export function CampaignDetailContent({ data }: CampaignDetailContentProps) {
	//

	//
	// A. Setup Variables

	const renderLexicalNode = useRenderLexicalNode();
	const debugContext = useDebugContext();
	const rootNode = getLexicalRoot(data.body);

	//
	// B. Render Components

	return (
		<>
			{data.body && rootNode && (
				<section className={styles.content}>
					{renderLexicalNode(rootNode)}

					{debugContext.flags.is_debug_mode && (
						<details>
							<summary>Raw Lexical JSON</summary>
							<pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
						</details>
					)}
				</section>
			)}
		</>
	);

	//
}
