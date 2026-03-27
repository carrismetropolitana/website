/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* * */

import type { CampaignData } from '@/types/campaign.types';

import { NewsData } from '@/types/news.types';
import { processBodyImages } from '@/utils/livePreviewImages';
import { mergeData } from '@/utils/livePreviewMerge';
import { transformCampaignPayloadData, transformPayloadData } from '@/utils/livePreviewTransform';
import { useCallback, useEffect, useRef, useState } from 'react';

/* * */

export function useLivePreviewData(initialData: any) {
	//

	//
	// A. Setup variables

	const [data, setData] = useState<any>(initialData);
	const newsData: NewsData | null = data ? transformPayloadData(data) : null;
	const campaignData: CampaignData | null = data ? transformCampaignPayloadData(data) : null;
	const hasSentReady = useRef(false);

	const applyProcessedBody = useCallback((processedBody: any) => {
		setData((prev: any) => (prev ? { ...prev, body: processedBody } : prev));
	}, []);

	useEffect(() => {
		if (!initialData?.body) return;

		const body = typeof initialData.body === 'string' ? JSON.parse(initialData.body) : initialData.body;
		if (!body?.root?.children) return;

		processBodyImages(body).then(applyProcessedBody);
	}, [initialData, applyProcessedBody]);

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
