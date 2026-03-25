'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { CampaignData } from '@/types/campaign.types';
import { getLexicalRoot } from '@/utils/getLexicalRoot';
import { processBodyImages } from '@/utils/livePreviewImages';
import { parseCampaignBody } from '@/utils/parseCampaignBody';
import { Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';

/* * */

interface CampaignDetailContentProps {
	data: CampaignData
}

export function CampaignDetailContent({ data }: CampaignDetailContentProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const [processedBody, setProcessedBody] = useState<unknown>(null);

	useEffect(() => {
		if (!data?.body) return;

		try {
			processBodyImages(data.body).then(setProcessedBody);
		}
		catch {
			setProcessedBody(null);
		}
	}, [data?.body]);

	//
	// B. Render components

	if (!data?.body) {
		return <Skeleton height={100} />;
	}

	const body = data.body ? (<div key={data.slug ?? data.id}>{renderLexicalNode(getLexicalRoot(parseCampaignBody(processedBody ?? data?.body)))}</div>) : null;

	return data.has_default_surface ? (
		<Surface>
			<Section withPadding>{body}</Section>
		</Surface>
	) : (
		<Section withPadding>{body}</Section>
	);

	//
}
