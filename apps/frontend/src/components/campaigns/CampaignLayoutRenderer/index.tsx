'use client';
/* * */

import type { CampaignLayoutBlock } from '@/types/campaign.types';

import { ThreeColumnsTextBlock } from '@/components/campaigns/blocks/ThreeColumnsTextBlock';
import { TwoColumnsTextBlock } from '@/components/campaigns/blocks/TwoColumnsTextBlock';
import { TwoColumnsTextImageBlock } from '@/components/campaigns/blocks/TwoColumnsTextImageBlock';

/* * */

interface CampaignLayoutRendererProps {
	blocks?: CampaignLayoutBlock[]
}

export function CampaignLayoutRenderer({ blocks }: CampaignLayoutRendererProps) {
	if (!blocks || blocks.length === 0) return null;

	return (
		<>
			{blocks.map((block, index) => {
				const key = block.id ?? index;
				switch (block.blockType) {
					case 'three-columns-text':
						return (
							<ThreeColumnsTextBlock
								key={key}
								centerColumn={block.centerColumn}
								leftColumn={block.leftColumn}
								rightColumn={block.rightColumn}
							/>
						);
					case 'two-columns-text':
						return (
							<TwoColumnsTextBlock
								key={key}
								leftColumn={block.leftColumn}
								rightColumn={block.rightColumn}
							/>
						);
					case 'two-columns-text-image':
						return (
							<TwoColumnsTextImageBlock
								key={key}
								image={block.image}
								imagePosition={block.imagePosition}
								text={block.text}
							/>
						);
					default:
						return null;
				}
			})}
		</>
	);
}
