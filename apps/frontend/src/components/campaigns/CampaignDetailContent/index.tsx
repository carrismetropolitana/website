'use client';
/* * */

import type { CampaignData } from '@/types/campaign.types';

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
	const rootNode = getLexicalRoot(data.body);

	//
	// B. Render Components

	return (
		<>
			{data.body && rootNode && (
				<section className={styles.content}>
					{renderLexicalNode(rootNode)}
				</section>
			)}
		</>
	);

	//
}
