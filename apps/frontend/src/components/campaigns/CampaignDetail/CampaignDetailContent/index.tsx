'use client';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
/* * */

import { CampaignData } from '@/types/campaign.types';
import { processBodyImages } from '@/utils/livePreviewImages';
import { getLexicalRoot, useRenderLexicalNode } from '@/utils/renderLexicalNode';
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
			const parsed = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
			processBodyImages(parsed).then(setProcessedBody);
		}
		catch {
			setProcessedBody(null);
		}
	}, [data?.body]);

	const bodyRoot = getLexicalRoot(processedBody ?? data?.body);

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
