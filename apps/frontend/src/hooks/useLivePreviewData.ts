/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* * */

import type { CampaignData } from '@/types/campaign.types';
import type { NewsData } from '@/types/news.types';

import { processBodyImages, processLayoutImages } from '@/utils/livePreviewImages';
import { mergeData } from '@/utils/livePreviewMerge';
import { transformCampaignPayloadData, transformPayloadData } from '@/utils/livePreviewTransform';
import { useCallback, useEffect, useRef, useState } from 'react';

/* * */

function isCampaignData(data: any): boolean {
	return Boolean(data && Array.isArray(data.layout));
}

/* * */

export function useLivePreviewData(initialData: any) {
	//

	//
	// A. Setup variables

	const [data, setData] = useState<any>(initialData);
	const isCampaign = isCampaignData(data);
	const newsData: NewsData | null = isCampaign ? null : (data ? transformPayloadData(data) : null);
	const campaignData: CampaignData | null = isCampaign ? (data ? transformCampaignPayloadData(data) : null) : null;
	const hasSentReady = useRef(false);

	const applyProcessedBody = useCallback((processedBody: any) => {
		setData((prev: any) => (prev ? { ...prev, body: processedBody } : prev));
	}, []);

	const applyProcessedLayout = useCallback((processedLayout: any[]) => {
		setData((prev: any) => (prev ? { ...prev, layout: processedLayout } : prev));
	}, []);

	useEffect(() => {
		if (!initialData?.body) return;

		const body = typeof initialData.body === 'string' ? JSON.parse(initialData.body) : initialData.body;
		if (!body?.root?.children) return;

		processBodyImages(body).then(applyProcessedBody);
	}, [initialData, applyProcessedBody]);

	useEffect(() => {
		if (!initialData?.layout || !Array.isArray(initialData.layout)) return;

		processLayoutImages(initialData.layout).then(applyProcessedLayout);
	}, [initialData, applyProcessedLayout]);

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			const { data: formData, type } = event.data || {};

			if (type !== 'payload-live-preview' || !formData) return;

			setData((prev: any) => {
				const merged = mergeData(prev, formData);

				if (merged?.body) {
					const body = typeof merged.body === 'string' ? JSON.parse(merged.body) : merged.body;
					const prevBody = typeof prev?.body === 'string' ? JSON.parse(prev.body) : prev?.body;
					processBodyImages(body, prevBody).then((processed) => {
						setData((current: any) => ({ ...current, body: processed }));
					});
				}

				if (merged?.layout && Array.isArray(merged.layout)) {
					const prevLayout = prev?.layout;
					processLayoutImages(merged.layout, prevLayout).then((processed) => {
						setData((current: any) => ({ ...current, layout: processed }));
					});
				}

				return merged;
			});
		};

		window.addEventListener('message', handleMessage);

		if (!hasSentReady.current && window.parent !== window) {
			hasSentReady.current = true;
			window.parent.postMessage({ ready: true, type: 'payload-live-preview' }, '*');
		}

		return () => window.removeEventListener('message', handleMessage);
	}, []);

	return { campaignData, newsData };
}
