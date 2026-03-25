'use client';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
/* * */

import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { CampaignData } from '@/types/campaign.types';
import { getLexicalRoot } from '@/utils/getLexicalRoot';
import { processBodyImages } from '@/utils/livePreviewImages';
import { Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

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

	const body = data.body && bodyRoot ? (
		<div className={styles.lexicalRoot}>{renderLexicalNode(bodyRoot)}</div>
	) : null;

	return data.has_default_surface ? (
		<Surface>
			<Section withPadding>{body}</Section>
		</Surface>
	) : (
		<Section withPadding>{body}</Section>
	);

	//
}
