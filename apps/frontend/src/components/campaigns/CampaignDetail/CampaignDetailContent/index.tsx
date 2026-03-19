'use client';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
/* * */

import { CampaignData } from '@/types/campaign.types';
import { getLexicalRoot, useRenderLexicalNode } from '@/utils/renderLexicalNode';
import { Skeleton } from '@mantine/core';

/* * */

interface CampaignDetailContentProps {
	data: CampaignData
}

export function CampaignDetailContent({ data }: CampaignDetailContentProps) {
	//

	//
	// A. Setup variables

	const bodyRoot = getLexicalRoot(data?.body);
	const renderLexicalNode = useRenderLexicalNode();

	//
	// B. Render components

	if (!data?.body || !bodyRoot) {
		return <Skeleton height={100} />;
	}

	return data.has_default_surface ? (
		<Surface>
			<Section withPadding>
				{data.body && bodyRoot && renderLexicalNode(bodyRoot)}
			</Section>
		</Surface>
	) : (
		<>
			{data.body && bodyRoot && renderLexicalNode(bodyRoot)}
		</>
	);

	//
}
