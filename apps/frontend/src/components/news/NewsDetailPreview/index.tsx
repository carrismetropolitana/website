/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsDetailHeader } from '@/components/news/NewsDetailHeader';
import { NewsDetailSidebar } from '@/components/news/NewsDetailSidebar';
import PayloadNews from '@/components/payload-components';
import { NewsData } from '@/types/news.types';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../NewsDetail/styles.module.css';

/* * */

/**
 * Deep merge helper that preserves populated relationship objects
 */
function deepMerge(oldValue: any, newValue: any, path = ''): any {
	// If new value is a string ID but old value is a populated object, keep the old object
	if (typeof newValue === 'string' && oldValue && typeof oldValue === 'object' && !Array.isArray(oldValue)) {
		return oldValue;
	}

	// For arrays, merge each item
	if (Array.isArray(newValue) && Array.isArray(oldValue)) {
		// Special handling for images arrays in gallery blocks
		if (path.includes('images') || path.includes('gallery')) {
			// Helper to extract ID from various structures
			const getId = (obj: any): null | string => {
				if (!obj) return null;
				if (typeof obj === 'string') return obj;
				// Check various possible ID locations
				return obj?.id || obj?.value?.id || obj?.file?.id || obj?.value?.value?.id || null;
			};

			// Match images by ID to preserve full objects
			return newValue.map((item: any) => {
				const itemId = getId(item);
				if (!itemId) return item;

				// Find matching object in old array
				const matched = oldValue.find((old: any) => {
					const oldId = getId(old);
					return oldId === itemId;
				});

				if (matched) {
					// If item is just an ID string, return the full matched object
					if (typeof item === 'string') {
						console.log(`[LivePreview] Matched ID ${item} to object:`, matched);
						return matched;
					}
					// If both are objects, merge them (preserving the matched object's structure)
					if (typeof matched === 'object' && typeof item === 'object') {
						// Preserve the structure from old (with value/file), but update any other fields
						return deepMerge(matched, item, path);
					}
					return matched;
				}

				console.log(`[LivePreview] No match found for ID: ${itemId}, oldValue length: ${oldValue.length}`);
				return item;
			});
		}
		// For other arrays, merge by index
		return newValue.map((item, index) => {
			const oldItem = oldValue[index];
			if (item && typeof item === 'object' && oldItem && typeof oldItem === 'object') {
				return deepMerge(oldItem, item, `${path}[${index}]`);
			}
			// If item is a string ID but oldItem is an object, keep oldItem
			if (typeof item === 'string' && oldItem && typeof oldItem === 'object') {
				return oldItem;
			}
			return item;
		});
	}

	// For objects, recursively merge
	if (newValue && typeof newValue === 'object' && !Array.isArray(newValue)) {
		if (oldValue && typeof oldValue === 'object' && !Array.isArray(oldValue)) {
			const merged = { ...oldValue };
			for (const key of Object.keys(newValue)) {
				// Special handling for fields.images in gallery blocks
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

	// Otherwise use new value
	return newValue;
}

function mergeData(initialData: any, formData: any): any {
	if (!formData) return initialData;
	if (!initialData) return formData;

	const merged = { ...initialData };

	for (const key of Object.keys(formData)) {
		const newValue = formData[key];
		const oldValue = initialData[key];

		// Special handling for body (Lexical JSON structure)
		if (key === 'body' && oldValue && newValue) {
			// If body is already a string (JSON), parse it
			const oldBody = typeof oldValue === 'string' ? JSON.parse(oldValue) : oldValue;
			const newBody = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;

			// Merge Lexical structure, preserving image objects in blocks
			if (oldBody.root && newBody.root) {
				const mergedBody = { ...newBody };
				mergedBody.root = deepMerge(oldBody.root, newBody.root, 'body.root');
				merged[key] = mergedBody;
				continue;
			}
			// If parsing failed or structure is different, keep old body
			if (oldBody && (!newBody || !newBody.root)) {
				merged[key] = oldValue;
				continue;
			}
		}

		// For other fields, use deep merge
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

	/**
	 * Fetch image data from Payload API via frontend proxy (avoids CORS)
	 */
	const fetchImageData = async (imageId: string): Promise<any> => {
		try {
			// Use frontend API route as proxy to avoid CORS
			const url = `http://localhost:49001/api/media/${imageId}?depth=2&draft=false&trash=false`;
			const response = await fetch(url);
			if (response.ok) {
				return await response.json();
			}
		}
		catch (error) {
			console.error(`[LivePreview] Failed to fetch image ${imageId}:`, error);
		}
		return null;
	};

	/**
	 * Process images array - fetch data for any IDs that are strings
	 */
	const processImagesArray = async (images: any[], oldImages: any[]): Promise<any[]> => {
		const processed = await Promise.all(
			images.map(async (item) => {
				// If it's already an object with URL, return it
				if (item && typeof item === 'object' && (item.url || item.value?.url || item.file?.url)) {
					return item;
				}

				// If it's a string ID, try to find in old images first
				if (typeof item === 'string') {
					const matched = oldImages?.find((old: any) => {
						const oldId = old?.id || old?.value?.id || old?.file?.id;
						return oldId === item;
					});
					if (matched) return matched;

					// Fetch from API
					const imageData = await fetchImageData(item);
					if (imageData) {
						// Return in the format Gallery component expects
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

	// Debug: log initial data structure on mount
	useEffect(() => {
		if (initialData?.body) {
			const body = typeof initialData.body === 'string' ? JSON.parse(initialData.body) : initialData.body;
			if (body?.root?.children) {
				const galleryBlocks = body.root.children.filter(
					(c: any) => c.type === 'block' && c.fields?.blockType === 'gallery',
				);
				if (galleryBlocks.length > 0) {
					console.log('[LivePreview] Initial data gallery images:', galleryBlocks[0].fields?.images);
					console.log('[LivePreview] First initial image:', galleryBlocks[0].fields?.images?.[0]);
				}
			}
		}
	}, [initialData]);

	const handleMessage = useCallback((event: MessageEvent) => {
		const eventData = event.data;

		if (eventData && typeof eventData === 'object' && eventData.type === 'payload-live-preview') {
			if (eventData.data) {
				setData((prev) => {
					const merged = mergeData(prev, eventData.data);

					// Process images in gallery blocks asynchronously
					if (merged?.body) {
						const mergedBody = typeof merged.body === 'string' ? JSON.parse(merged.body) : merged.body;
						if (mergedBody?.root?.children) {
							const prevBody = typeof prev?.body === 'string' ? JSON.parse(prev.body) : prev?.body;
							const prevGalleryBlocks = prevBody?.root?.children?.filter(
								(c: any) => c.type === 'block' && c.fields?.blockType === 'gallery',
							) || [];

							// Process each gallery block asynchronously
							mergedBody.root.children.forEach(async (block: any, index: number) => {
								if (block.type === 'block' && block.fields?.blockType === 'gallery' && block.fields?.images) {
									const prevBlock = prevGalleryBlocks[index] || prevGalleryBlocks.find((b: any) => b.fields?.blockType === 'gallery');
									const prevImages = prevBlock?.fields?.images || [];

									// Fetch image data for any IDs
									const processedImages = await processImagesArray(block.fields.images, prevImages);

									// Update state with processed images
									setData((current) => {
										const currentBody = typeof current?.body === 'string' ? JSON.parse(current.body) : current?.body;
										if (currentBody?.root?.children?.[index]?.fields) {
											const updatedBody = JSON.parse(JSON.stringify(currentBody)); // Deep clone
											updatedBody.root.children[index].fields.images = processedImages;
											return { ...current, body: updatedBody };
										}
										return current;
									});
								}
							});
							merged.body = mergedBody;
						}
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

			window.parent.postMessage(
				{ ready: true, type: 'payload-live-preview' },
				'*',
			);
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
