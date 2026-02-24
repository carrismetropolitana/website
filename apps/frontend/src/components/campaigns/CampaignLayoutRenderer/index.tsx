'use client';
/* * */

import type { CampaignLayoutBlock } from '@/types/campaign.types';

import { ThreeColumnsText } from '@/components/payload/ThreeColumnsText';
import { TwoColumnsText } from '@/components/payload/TwoColumnsText';
import { TwoColumnsTextImage } from '@/components/payload/TwoColumnsTextImage';

/* * */

interface CampaignLayoutRendererProps {
	blocks?: CampaignLayoutBlock[]
}

export function CampaignLayoutRenderer({ blocks }: CampaignLayoutRendererProps) {
	//

	//
	// A. Render Components

	if (!blocks || blocks.length === 0) return null;

	return (
		<>
			{blocks.map((block, index) => {
				const key = block.id ?? index;
				switch (block.blockType) {
					case 'spacer':
						return (
							<div
								key={key}
								style={{ height: `${block.height ?? 32}px` }}
							/>
						);
					case 'three-columns-text':
						return (
							<ThreeColumnsText
								key={key}
								centerColumn={block.centerColumn}
								leftColumn={block.leftColumn}
								rightColumn={block.rightColumn}
							/>
						);
					case 'two-columns-text':
						return (
							<TwoColumnsText
								key={key}
								leftColumn={block.leftColumn}
								rightColumn={block.rightColumn}
							/>
						);
					case 'two-columns-text-image':
						return (
							<TwoColumnsTextImage
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

	//
}
