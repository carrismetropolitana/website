/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsDetailHeader } from '@/components/news/NewsDetailHeader';
import { NewsDetailSidebar } from '@/components/news/NewsDetailSidebar';
import PayloadNews from '@/components/payload-components';
import { NewsData } from '@/types/news.types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import styles from '../NewsDetail/styles.module.css';

/* * */

function transformPayloadData(payloadData: any): NewsData {
	// Transform Payload format to frontend NewsData format
	return {
		accordion: payloadData.accordion,
		body: typeof payloadData.body === 'string' ? payloadData.body : JSON.stringify(payloadData.body),
		featured_image: payloadData.featured_image && typeof payloadData.featured_image === 'object'
			? {
				filename: payloadData.featured_image.filename || '',
				thumbnailURL: payloadData.featured_image.sizes?.thumbnail?.url || payloadData.featured_image.url || '',
				url: payloadData.featured_image.url || '',
			}
			: {
				filename: '',
				thumbnailURL: '',
				url: '',
			},
		id: payloadData.id || '',
		publishedAt: payloadData.publishedAt || '',
		summary: payloadData.summary || '',
		title: payloadData.title || '',
		topics: Array.isArray(payloadData.topics)
			? payloadData.topics.map((topic: any) => typeof topic === 'string' ? topic : topic.id || topic.title || '')
			: [],
		updated_at: payloadData.updatedAt || payloadData.updated_at || '',
	};
}

interface NewsDetailPreviewProps {
	initialData: NewsData | null
	newsId: string
}

export function NewsDetailPreview({ initialData, newsId }: NewsDetailPreviewProps) {
	//
	const router = useRouter();
	const hasSentReadyMessage = useRef(false);

	//
	// A. Transform initial data
	const newsData = initialData ? transformPayloadData(initialData) : null;

	//
	// B. Listen for postMessage from Payload and refresh route
	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			// Check if message is from Payload admin panel
			// Payload sends document-level events when draft is saved
			if (event.data && typeof event.data === 'object') {
				// Check if it's a document event (has collection and id)
				if (event.data.collection === 'news' && (event.data.id === newsId || event.data.doc?.id === newsId)) {
					// Refresh the route to fetch new draft data
					router.refresh();
				}
			}
		};

		window.addEventListener('message', handleMessage);

		// Tell Payload admin panel that we're ready to receive messages
		if (!hasSentReadyMessage.current && typeof window !== 'undefined') {
			hasSentReadyMessage.current = true;
			// Send ready message to parent (Payload admin panel)
			if (window.parent && window.parent !== window) {
				window.parent.postMessage({ type: 'payload-live-preview-ready' }, '*');
			}
		}

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [router, newsId]);

	//
	// C. Render components

	if (!newsData) {
		return (
			<Surface>
				<Section withPadding>
					<div>Loading preview...</div>
				</Section>
			</Surface>
		);
	}

	return (
		<Surface>

			<Section withBottomDivider withPadding>
				<BackButton />
			</Section>

			<NewsDetailHeader newsData={newsData} />

			<Section withPadding>
				<div className={styles.innerWrapper} />
			</Section>

			<Section withPadding>
				<div className={styles.innerWrapper}>
					<PayloadNews data={newsData} />
					{newsData.body && <NewsDetailSidebar newsBody={newsData.body} />}
				</div>
			</Section>

		</Surface>
	);

	//
}
