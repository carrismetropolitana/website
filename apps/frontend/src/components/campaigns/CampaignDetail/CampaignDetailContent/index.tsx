'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { CampaignData } from '@/types/campaign.types';
import { getLexicalRoot } from '@/utils/getLexicalRoot';
import { Skeleton } from '@mantine/core';

/* * */

interface CampaignDetailContentProps {
	data: CampaignData
}

export function CampaignDetailContent({ data }: CampaignDetailContentProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();

	//
	// B. Render components

	if (!data?.body) {
		return <Skeleton height={100} />;
	}

	const body = data.body ? (<div key={data.slug ?? data.id}>{renderLexicalNode(getLexicalRoot(data?.body))}</div>) : null;

	return data.has_default_surface ? (
		<Surface>
			<Section withPadding>{body}</Section>
		</Surface>
	) : (
		<Section withPadding>{body}</Section>
	);

	//
}
