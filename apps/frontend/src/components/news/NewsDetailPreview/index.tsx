/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsDetailHeader } from '@/components/news/NewsDetailHeader';
import { NewsDetailSidebar } from '@/components/news/NewsDetailSidebar';
import PayloadNews from '@/components/payload';
import { NewsData } from '@/types/news.types';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../NewsDetail/styles.module.css';

/* * */

function deepMerge(oldValue: any, newValue: any, path = ''): any {
	if ((typeof newValue === 'string' || typeof newValue === 'number') && oldValue && typeof oldValue === 'object' && !Array.isArray(oldValue)) {
		return oldValue;
	}

	if (Array.isArray(newValue) && Array.isArray(oldValue)) {
		if (path.includes('images') || path.includes('gallery')) {
			const getId = (obj: any): null | string => {
				if (!obj) return null;
				if (typeof obj === 'string') return obj;
				if (typeof obj === 'number') return String(obj);
				return obj?.id || obj?.value?.id || obj?.file?.id || obj?.value?.value?.id || null;
			};

			return newValue.map((item: any) => {
				const itemId = getId(item);
				if (!itemId) return item;

				// Find matching object in old array
				const matched = oldValue.find((old: any) => {
					const oldId = getId(old);
					return oldId === itemId;
				});

				if (matched) {
					if (typeof item === 'string' || typeof item === 'number') {
						return matched;
					}
					if (typeof matched === 'object' && typeof item === 'object') {
						return deepMerge(matched, item, path);
					}
					return matched;
				}

				return item;
			});
		}
		return newValue.map((item, index) => {
			const oldItem = oldValue[index];
			if (item && typeof item === 'object' && oldItem && typeof oldItem === 'object') {
				return deepMerge(oldItem, item, `${path}[${index}]`);
			}
			if ((typeof item === 'string' || typeof item === 'number') && oldItem && typeof oldItem === 'object') {
				return oldItem;
			}
			return item;
		});
	}

	if (newValue && typeof newValue === 'object' && !Array.isArray(newValue)) {
		if (oldValue && typeof oldValue === 'object' && !Array.isArray(oldValue)) {
			const merged = { ...oldValue };
			for (const key of Object.keys(newValue)) {
				if (key === 'images' && path.includes('fields')) {
					merged[key] = deepMerge(oldValue[key], newValue[key], `${path}.${key}`);
				}
				else {
					merged[key] = deepMerge(oldValue[key], newValue[key], path ? `${path}.${key}` : key);
				}
			}
			return merged;
		}
	}

	return newValue;
}

function mergeData(initialData: any, formData: any): any {
	if (!formData) return initialData;
	if (!initialData) return formData;

	const merged = { ...initialData };

	for (const key of Object.keys(formData)) {
		const newValue = formData[key];
		const oldValue = initialData[key];

		if (key === 'body' && oldValue && newValue) {
			const oldBody = typeof oldValue === 'string' ? JSON.parse(oldValue) : oldValue;
			const newBody = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;

			if (oldBody.root && newBody.root) {
				const mergedBody = { ...newBody };
				mergedBody.root = deepMerge(oldBody.root, newBody.root, 'body.root');
				merged[key] = mergedBody;
				continue;
			}
			if (oldBody && (!newBody || !newBody.root)) {
				merged[key] = oldValue;
				continue;
			}
		}

		merged[key] = deepMerge(oldValue, newValue, key);
	}

	return merged;
}

function transformPayloadData(payloadData: any): NewsData {
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

/* * */

interface NewsDetailPreviewProps {
	initialData: any
}

export function NewsDetailPreview({ initialData }: NewsDetailPreviewProps) {
	//

	const [data, setData] = useState<any>(initialData);
	const hasSentReadyMessage = useRef<boolean>(false);

	const fetchImageData = async (imageId: number | string): Promise<any> => {
		const id = String(imageId);
		try {
			const url = `/api/media/${id}`;
			const response = await fetch(url);
			if (response.ok) {
				return await response.json();
			}
		}
		catch (error) {
			console.error(`[LivePreview] Failed to fetch image ${id}:`, error);
		}
		return null;
	};

	const getImageId = (item: any): null | string => {
		if (!item) return null;
		if (typeof item === 'string') return item;
		if (typeof item === 'number') return String(item);
		return item?.id || item?.value?.id || item?.file?.id || item?.value?.value?.id || null;
	};

	const processImagesArray = async (images: any[], oldImages: any[]): Promise<any[]> => {
		const processed = await Promise.all(
			images.map(async (item) => {
				if (item && typeof item === 'object' && (item.url || item.value?.url || item.file?.url)) {
					return item;
				}

				const itemId = getImageId(item);
				if (itemId) {
					const matched = oldImages?.find((old: any) => getImageId(old) === itemId);
					if (matched) return matched;

					const imageData = await fetchImageData(itemId);
					if (imageData) {
						return {
							value: {
								filename: imageData.filename,
								height: imageData.height,
								id: imageData.id,
								mimeType: imageData.mimeType,
								url: imageData.url,
								width: imageData.width,
							},
						};
					}
				}

				return item;
			}),
		);
		return processed;
	};

	const processUploadNodes = async (node: any): Promise<any> => {
		if (!node) return node;

		if (node.type === 'upload') {
			const value = node.value;
			// Already has URL
			if (value && typeof value === 'object' && value.url) return node;

			const id = value != null ? (typeof value === 'object' ? value?.id : String(value)) : null;
			if (id) {
				const imageData = await fetchImageData(id);
				if (imageData) {
					return { ...node, value: imageData };
				}
			}
			return node;
		}

		if (Array.isArray(node.children)) {
			node = { ...node, children: await Promise.all(node.children.map((c: any) => processUploadNodes(c))) };
		}

		return node;
	};

	const processBodyImages = async (body: any, prevBody?: any): Promise<any> => {
		if (!body?.root?.children) return body;

		const prevGalleryBlocks = prevBody?.root?.children?.filter(
			(c: any) => c.type === 'block' && c.fields?.blockType === 'gallery',
		) || [];

		const processedChildren = await Promise.all(
			body.root.children.map(async (block: any, index: number) => {
				// Process gallery blocks
				if (block.type === 'block' && block.fields?.blockType === 'gallery' && block.fields?.images) {
					const prevBlock = prevGalleryBlocks[index] ?? prevGalleryBlocks.find((b: any) => b.fields?.blockType === 'gallery');
					const prevImages = prevBlock?.fields?.images || [];
					const processedImages = await processImagesArray(block.fields.images, prevImages);
					return { ...block, fields: { ...block.fields, images: processedImages } };
				}

				return processUploadNodes(block);
			}),
		);

		return { ...body, root: { ...body.root, children: processedChildren } };
	};

	useEffect(() => {
		if (!initialData?.body) return;

		const body = typeof initialData.body === 'string' ? JSON.parse(initialData.body) : initialData.body;
		if (!body?.root?.children) return;

		processBodyImages(body).then((processedBody) => {
			setData(prev => (prev ? { ...prev, body: processedBody } : prev));
		});
	}, [initialData]);

	const handleMessage = useCallback((event: MessageEvent) => {
		const eventData = event.data;

		if (eventData && typeof eventData === 'object' && eventData.type === 'payload-live-preview') {
			if (eventData.data) {
				setData((prev) => {
					const merged = mergeData(prev, eventData.data);

					// Process images (gallery + upload nodes) asynchronously
					if (merged?.body) {
						const mergedBody = typeof merged.body === 'string' ? JSON.parse(merged.body) : merged.body;
						const prevBody = typeof prev?.body === 'string' ? JSON.parse(prev.body) : prev?.body;

						processBodyImages(mergedBody, prevBody).then((processedBody) => {
							setData(current => ({ ...current, body: processedBody }));
						});
					}
					return merged;
				});
			}
		}
	}, []);

	useEffect(() => {
		window.addEventListener('message', handleMessage);
		if (!hasSentReadyMessage.current && window.parent && window.parent !== window) {
			hasSentReadyMessage.current = true;
			window.parent.postMessage({ ready: true, type: 'payload-live-preview' }, '*');
		}

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [handleMessage]);

	const newsData = data ? transformPayloadData(data) : null;

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
