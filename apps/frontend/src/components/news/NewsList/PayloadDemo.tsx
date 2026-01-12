'use client';

/**
 * Payload CMS Blocks & Content Parser
 *
 * This module provides utilities to fetch and parse Payload CMS page builder blocks
 * and Lexical editor content into React components with preserved styling and positioning.
 *
 * Payload CMS stores pages as blocks arrays where each block has:
 * - blockType: The block identifier (slug)
 * - All block fields (title, content, images, etc.)
 * - Styling/positioning metadata (if configured)
 *
 * @example
 * // Method 1: Fetch full page with blocks from Payload
 * import { usePayloadPage } from '@/components/news/NewsList/PayloadDemo';
 *
 * function MyPage({ pageId }) {
 *   const { blocks, isLoading, error } = usePayloadPage('pages', pageId);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return <PayloadBlocksRenderer blocks={blocks} />;
 * }
 *
 * @example
 * // Method 2: Render blocks directly
 * import { PayloadBlocksRenderer } from '@/components/news/NewsList/PayloadDemo';
 *
 * function MyComponent() {
 *   const { data } = useSWR('/api/pages?where[id][equals]=123');
 *   const page = data?.docs?.[0];
 *
 *   return (
 *     <PayloadBlocksRenderer
 *       blocks={page?.layout || []}
 *       blockComponents={{
 *         'hero': HeroBlock,
 *         'content-section': ContentSection,
 *         'cta': CTABlock,
 *       }}
 *     />
 *   );
 * }
 *
 * @example
 * // Method 3: Fetch and render with custom styling preservation
 * const response = await fetch('http://localhost:49002/api/pages?where[slug][equals]=home');
 * const data = await response.json();
 * const page = data.docs[0];
 *
 * // page.layout is an array of blocks:
 * // [
 * //   {
 * //     blockType: 'hero',
 * //     title: 'Welcome',
 * //     backgroundImage: {...},
 * //     backgroundColor: '#ff0000',
 * //     padding: { top: 50, bottom: 50 },
 * //     // ... all other block fields
 * //   },
 * //   { blockType: 'content-section', ... }
 * // ]
 */

/* * */

import React, { useEffect } from 'react';
import useSWR from 'swr';

/* * */

export interface BlockProps {
	[key: string]: unknown
	children?: React.ReactNode
}

export type BlockComponent = React.ComponentType<BlockProps>;

interface PayloadDemoProps {
	baseUrl?: string // Optional: override the base URL
	collection?: string // e.g., 'news', 'notes', 'topics', etc.
	customBlocks?: Record<string, BlockComponent> // Custom block components
	limit?: number // Number of records to display (default: 1)
}

/* * */

/**
 * Example JSON structure that Payload CMS sends for Lexical editor content:
 *
 * {
 *   "body": {
 *     "root": {
 *       "children": [
 *         {
 *           "children": [
 *             {
 *               "detail": 0,
 *               "format": 0,
 *               "mode": "normal",
 *               "style": "",
 *               "text": "This is a paragraph with ",
 *               "type": "text",
 *               "version": 1
 *             },
 *             {
 *               "detail": 0,
 *               "format": 1,
 *               "mode": "normal",
 *               "style": "",
 *               "text": "bold text",
 *               "type": "text",
 *               "version": 1
 *             }
 *           ],
 *           "direction": "ltr",
 *           "format": "",
 *           "indent": 0,
 *           "type": "paragraph",
 *           "version": 1
 *         },
 *         {
 *           "children": [
 *             {
 *               "detail": 0,
 *               "format": 0,
 *               "mode": "normal",
 *               "style": "",
 *               "text": "This is a heading",
 *               "type": "text",
 *               "version": 1
 *             }
 *           ],
 *           "direction": "ltr",
 *           "format": "",
 *           "indent": 0,
 *           "tag": "h2",
 *           "type": "heading",
 *           "version": 1
 *         },
 *         {
 *           "children": [
 *             {
 *               "children": [
 *                 {
 *                   "detail": 0,
 *                   "format": 0,
 *                   "mode": "normal",
 *                   "style": "",
 *                   "text": "List item 1",
 *                   "type": "text",
 *                   "version": 1
 *                 }
 *               ],
 *               "type": "listitem",
 *               "value": 1,
 *               "version": 1
 *             },
 *             {
 *               "children": [
 *                 {
 *                   "detail": 0,
 *                   "format": 0,
 *                   "mode": "normal",
 *                   "style": "",
 *                   "text": "List item 2",
 *                   "type": "text",
 *                   "version": 1
 *                 }
 *               ],
 *               "type": "listitem",
 *               "value": 2,
 *               "version": 1
 *             }
 *           ],
 *           "listType": "bullet",
 *           "type": "list",
 *           "version": 1
 *         },
 *         {
 *           "children": [
 *             {
 *               "detail": 0,
 *               "format": 0,
 *               "mode": "normal",
 *               "style": "",
 *               "text": "Link text",
 *               "type": "text",
 *               "version": 1
 *             }
 *           ],
 *           "direction": "ltr",
 *           "format": "",
 *           "indent": 0,
 *           "rel": null,
 *           "target": null,
 *           "title": null,
 *           "type": "link",
 *           "url": "https://example.com",
 *           "version": 1
 *         },
 *         {
 *           "alt": "Image description",
 *           "height": 400,
 *           "maxWidth": 800,
 *           "src": "https://example.com/image.jpg",
 *           "type": "image",
 *           "version": 1,
 *           "width": 600
 *         }
 *       ],
 *       "direction": "ltr",
 *       "format": "",
 *       "indent": 0,
 *       "type": "root",
 *       "version": 1
 *     }
 *   }
 * }
 *
 * For custom blocks (page builder components), the structure would be:
 * {
 *   "root": {
 *     "children": [
 *       {
 *         "type": "my-custom-block",
 *         "version": 1,
 *         "title": "My Custom Title",
 *         "content": "Custom content here",
 *         "children": [] // Custom blocks may or may not have children
 *       }
 *     ]
 *   }
 * }
 */

// Lexical Node Types
export interface LexicalNode {
	[key: string]: unknown
	type: string
	version?: number
}

export interface LexicalRoot {
	root: {
		[key: string]: unknown
		children: LexicalNode[]
	}
}

// Block component registry - maps block types to React components
const defaultBlockComponents: Record<string, BlockComponent> = {
	// Text nodes
	code: ({ children, ...props }: BlockProps) => <code {...props}>{children}</code>,
	heading: ({ children, tag = 'h2', ...props }: BlockProps & { tag?: string }) => {
		const HeadingTag = tag || 'h2';
		if (HeadingTag === 'h1') return <h1 {...props}>{children}</h1>;
		if (HeadingTag === 'h2') return <h2 {...props}>{children}</h2>;
		if (HeadingTag === 'h3') return <h3 {...props}>{children}</h3>;
		if (HeadingTag === 'h4') return <h4 {...props}>{children}</h4>;
		if (HeadingTag === 'h5') return <h5 {...props}>{children}</h5>;
		if (HeadingTag === 'h6') return <h6 {...props}>{children}</h6>;
		return <h2 {...props}>{children}</h2>;
	},
	linebreak: () => <br />,
	paragraph: ({ children, ...props }: BlockProps) => <p {...props}>{children}</p>,
	text: ({ text, ...props }: BlockProps & { text?: string }) => <span {...props}>{text as string}</span>,
	// Lists
	list: ({ children, listType = 'bullet', ...props }: BlockProps & { listType?: string }) => {
		const Tag = listType === 'number' ? 'ol' : 'ul';
		return <Tag {...props}>{children}</Tag>;
	},
	listitem: ({ children, ...props }: BlockProps) => <li {...props}>{children}</li>,
	// Formatting
	link: ({ children, url, ...props }: BlockProps & { url?: string }) => (
		<a href={url as string} {...props}>
			{children}
		</a>
	),
	quote: ({ children, ...props }: BlockProps) => <blockquote {...props}>{children}</blockquote>,
	// Media
	image: ({ alt, src, ...props }: BlockProps & { alt?: string, src?: string }) => (
		<img alt={(alt as string) || ''} src={src as string} style={{ height: 'auto', maxWidth: '100%' }} {...props} />
	),
};

/* * */

// Helper function to check if a value is a URL (for images)
function isImageUrl(value: unknown): boolean {
	if (typeof value !== 'string') return false;
	return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(value) || value.startsWith('http');
}

// Helper function to check if a value looks like HTML
function isHtml(value: unknown): boolean {
	if (typeof value !== 'string') return false;
	return /<[a-z][\s\S]*>/i.test(value);
}

// Helper function to check if a value is a date string
function isDateString(value: unknown): boolean {
	if (typeof value !== 'string') return false;
	return !isNaN(Date.parse(value)) && value.includes('T');
}

// Parse Lexical JSON structure into React components
export function parseLexicalNode(
	node: LexicalNode,
	customBlocks: Record<string, BlockComponent> = {},
	index = 0,
): React.ReactNode {
	const allBlocks = { ...defaultBlockComponents, ...customBlocks };
	const BlockComponent = allBlocks[node.type];

	if (!BlockComponent) {
		// Unknown block type - render as fallback
		return (
			<div key={index} style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: '4px', margin: '8px 0', padding: '8px' }}>
				<strong style={{ color: '#856404', fontSize: '12px' }}>Unknown block type: {node.type}</strong>
				<pre style={{ fontSize: '11px', marginTop: '4px', overflow: 'auto' }}>
					{JSON.stringify(node, null, 2)}
				</pre>
			</div>
		);
	}

	// Extract children if they exist
	let children: React.ReactNode = null;
	if (node.children && Array.isArray(node.children)) {
		children = node.children.map((child, childIndex) =>
			parseLexicalNode(child as LexicalNode, customBlocks, childIndex),
		);
	}

	// Extract text if it's a text node
	if (node.type === 'text' && 'text' in node) {
		return <BlockComponent key={index} text={node.text} {...node} />;
	}

	// Extract other props from node (excluding type and children)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { children: _children, type: _type, ...props } = node;

	return (
		<BlockComponent key={index} {...props}>
			{children}
		</BlockComponent>
	);
}

// Parse Lexical JSON structure
export function parseLexicalContent(
	content: LexicalRoot | unknown,
	customBlocks: Record<string, BlockComponent> = {},
): React.ReactNode {
	// Check if it's a Lexical structure
	if (typeof content === 'object' && content !== null && 'root' in content) {
		const lexicalContent = content as LexicalRoot;
		if (lexicalContent.root?.children && Array.isArray(lexicalContent.root.children)) {
			return (
				<div style={{ lineHeight: '1.6' }}>
					{lexicalContent.root.children.map((node, index) =>
						parseLexicalNode(node, customBlocks, index),
					)}
				</div>
			);
		}
	}

	// Fallback: not a Lexical structure
	return null;
}

// Helper function to format field values
function formatFieldValue(
	key: string,
	value: unknown,
	customBlocks: Record<string, BlockComponent> = {},
): React.ReactNode {
	// Handle null/undefined
	if (value === null || value === undefined) {
		return <span style={{ color: '#999', fontStyle: 'italic' }}>null</span>;
	}

	// Check if it's a Lexical structure (body field from Payload)
	if (key === 'body' || (typeof value === 'object' && value !== null && 'root' in value)) {
		const parsed = parseLexicalContent(value as LexicalRoot, customBlocks);
		if (parsed) {
			return (
				<div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', marginTop: '8px', padding: '16px' }}>
					{parsed}
				</div>
			);
		}
	}

	// Handle arrays
	if (Array.isArray(value)) {
		if (value.length === 0) return <span style={{ color: '#999' }}>[]</span>;
		return (
			<ul style={{ margin: 0, paddingLeft: '20px' }}>
				{value.map((item, index) => (
					<li key={index}>{formatFieldValue(`${key}[${index}]`, item, customBlocks)}</li>
				))}
			</ul>
		);
	}

	// Handle objects
	if (typeof value === 'object') {
		return (
			<div style={{ backgroundColor: '#f9f9f9', borderRadius: '4px', marginLeft: '16px', padding: '8px' }}>
				{Object.entries(value as Record<string, unknown>).map(([objKey, objValue]) => (
					<div key={objKey} style={{ marginBottom: '4px' }}>
						<strong>{objKey}:</strong> {formatFieldValue(objKey, objValue, customBlocks)}
					</div>
				))}
			</div>
		);
	}

	// Handle strings
	if (typeof value === 'string') {
		// Check if it's an image URL
		if (isImageUrl(value)) {
			return (
				<div style={{ marginTop: '8px' }}>
					<img
						alt={key}
						src={value}
						style={{ borderRadius: '4px', height: 'auto', maxHeight: '200px', maxWidth: '100%' }}
					/>
					<div style={{ color: '#666', fontSize: '11px', marginTop: '4px' }}>{value}</div>
				</div>
			);
		}
		// Check if it's HTML
		if (isHtml(value)) {
			return (
				<div
					dangerouslySetInnerHTML={{ __html: value }}
					style={{
						border: '1px solid #eee',
						borderRadius: '4px',
						marginTop: '8px',
						padding: '8px',
					}}
				/>
			);
		}
		// Check if it's a date
		if (isDateString(value)) {
			return <span>{new Date(value).toLocaleString()}</span>;
		}
		// Regular string
		return <span>{value}</span>;
	}

	// Handle numbers and booleans
	return <span>{String(value)}</span>;
}

/* * */

export function PayloadDemo({ baseUrl, collection = 'news', customBlocks, limit = 1 }: PayloadDemoProps) {
	//

	//
	// A. Setup variables

	const apiBaseUrl = baseUrl || 'http://localhost:49002';
	const payloadApiUrl = `${apiBaseUrl}/api/${collection}`;

	//
	// B. Fetch data from Payload CMS

	const { data, error, isLoading } = useSWR<unknown[] | { docs?: unknown[] }>(payloadApiUrl);

	//
	// B. Render components

	if (isLoading) {
		return (
			<div style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0', padding: '20px' }}>
				<h2 style={{ marginTop: 0 }}>Payload CMS Demo - Loading...</h2>
				<p>Fetching data from: {payloadApiUrl}</p>
			</div>
		);
	}

	if (error) {
		return (
			<div style={{ backgroundColor: '#ffe6e6', border: '1px solid #f00', borderRadius: '8px', margin: '20px 0', padding: '20px' }}>
				<h2 style={{ marginTop: 0 }}>Payload CMS Demo - Error</h2>
				<p>Failed to fetch data from: {payloadApiUrl}</p>
				<p style={{ color: '#d00' }}>Error: {error.message}</p>
			</div>
		);
	}

	//
	// C. Transform data

	// Handle Payload CMS response format (can be { docs: [...] } or direct array)
	const items = Array.isArray(data) ? data : (data?.docs || []);
	const displayItems = items.slice(0, limit);

	//
	// D. Render components

	if (!data || items.length === 0) {
		return (
			<div style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0', padding: '20px' }}>
				<h2 style={{ marginTop: 0 }}>Payload CMS Demo</h2>
				<p>No items found in collection: <strong>{collection}</strong></p>
				<p style={{ color: '#666', fontSize: '12px' }}>API URL: {payloadApiUrl}</p>
			</div>
		);
	}

	return (
		<div style={{ backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0', padding: '20px' }}>
			<h2 style={{ marginTop: 0 }}>Payload CMS Demo</h2>
			<p style={{ color: '#666', fontSize: '12px', marginBottom: '20px' }}>
				Collection: <strong>{collection}</strong> | Fetched from: {payloadApiUrl}
			</p>
			<p style={{ fontSize: '14px', marginBottom: '20px' }}>
				Total items: {items.length} | Displaying: {displayItems.length}
			</p>

			<div style={{ display: 'grid', gap: '16px' }}>
				{displayItems.map((item, index) => {
					const itemData = item as Record<string, unknown>;
					const itemKeys = Object.keys(itemData);

					// Try to find a title field (common patterns)
					const titleField = itemKeys.find(key =>
						['heading', 'label', 'name', 'title'].includes(key.toLowerCase()),
					);
					const title = titleField ? String(itemData[titleField]) : `Item ${index + 1}`;

					// Try to find an ID field
					const idField = itemKeys.find(key =>
						['_id', 'id', 'uuid'].includes(key.toLowerCase()),
					);
					const itemId = idField ? String(itemData[idField]) : String(index);

					return (
						<div
							key={itemId}
							style={{
								backgroundColor: '#fff',
								border: '1px solid #ddd',
								borderRadius: '4px',
								padding: '16px',
							}}
						>
							<h3 style={{ fontSize: '18px', margin: 0, marginBottom: '16px' }}>{title}</h3>

							{/* Dynamically render all fields */}
							<div style={{ display: 'grid', gap: '12px' }}>
								{itemKeys.map((key) => {
									const value = itemData[key];

									// Skip internal/metadata fields if you want
									if (key.startsWith('_') && key !== '_id') return null;

									return (
										<div key={key} style={{ borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
											<strong style={{ color: '#666', display: 'block', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase' }}>
												{key}:
											</strong>
											<div style={{ fontSize: '14px' }}>
												{formatFieldValue(key, value, customBlocks)}
											</div>
										</div>
									);
								})}
							</div>

							<details style={{ marginTop: '16px' }}>
								<summary style={{ color: '#666', cursor: 'pointer', fontSize: '12px' }}>View raw JSON</summary>
								<pre style={{ backgroundColor: '#f5f5f5', borderRadius: '4px', fontSize: '11px', marginTop: '8px', maxHeight: '400px', overflow: 'auto', padding: '8px' }}>
									{JSON.stringify(item, null, 2)}
								</pre>
							</details>
						</div>
					);
				})}
			</div>
		</div>
	);

	//
}

/* * */

/**
 * Hook to fetch and parse Payload CMS content
 *
 * @example
 * // Basic usage
 * const { content, isLoading, error } = usePayloadContent('news', 'body');
 *
 * @example
 * // With custom blocks
 * const { content } = usePayloadContent('pages', 'content', {
 *   'hero-section': HeroSection,
 *   'cta-button': CTAButton,
 * });
 */
export function usePayloadContent(
	collection: string,
	fieldName = 'body',
	customBlocks?: Record<string, BlockComponent>,
	baseUrl?: string,
) {
	const apiBaseUrl = baseUrl || 'http://localhost:49002';
	const payloadApiUrl = `${apiBaseUrl}/api/${collection}`;

	const { data, error, isLoading } = useSWR<unknown[] | { docs?: unknown[] }>(payloadApiUrl);

	// Extract the first item's field value
	const fieldValue = React.useMemo(() => {
		if (!data) return null;

		const items = Array.isArray(data) ? data : (data?.docs || []);
		if (items.length === 0) return null;

		const firstItem = items[0] as Record<string, unknown>;
		return firstItem[fieldName] || null;
	}, [data, fieldName]);

	// Parse the Lexical content
	const parsedContent = React.useMemo(() => {
		if (!fieldValue) return null;
		return parseLexicalContent(fieldValue, customBlocks);
	}, [fieldValue, customBlocks]);

	return {
		content: parsedContent,
		error,
		isLoading,
		rawData: fieldValue,
	};
}

/* * */

/**
 * Component to render Payload CMS Lexical content directly
 *
 * @example
 * <PayloadContent
 *   content={newsItem.body}
 *   customBlocks={{
 *     'hero': HeroBlock,
 *     'features': FeaturesBlock,
 *   }}
 * />
 */
export function PayloadContent({
	className,
	content,
	customBlocks,
	style,
}: {
	className?: string
	content: LexicalRoot | unknown
	customBlocks?: Record<string, BlockComponent>
	style?: React.CSSProperties
}) {
	const parsed = parseLexicalContent(content, customBlocks);

	if (!parsed) {
		return null;
	}

	return (
		<div className={className} style={style}>
			{parsed}
		</div>
	);
}

/* * */

/**
 * Payload Block Structure
 * Each block from Payload CMS has this structure:
 */
export interface PayloadBlock {
	[key: string]: unknown // All block fields (title, content, images, styling, etc.)
	blockType: string
	id?: string
}

/**
 * Render Payload CMS page builder blocks with preserved styling and positioning
 *
 * @example
 * <PayloadBlocksRenderer
 *   blocks={page.layout}
 *   blockComponents={{
 *     'hero': HeroBlock,
 *     'content': ContentBlock,
 *   }}
 * />
 */
export function PayloadBlocksRenderer({
	blockComponents,
	blocks,
	className,
	style,
}: {
	blockComponents: Record<string, BlockComponent>
	blocks: PayloadBlock[]
	className?: string
	style?: React.CSSProperties
}) {
	if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
		return null;
	}

	return (
		<div className={className} style={style}>
			{blocks.map((block, index) => {
				const BlockComponent = blockComponents[block.blockType];

				if (!BlockComponent) {
					console.warn(`No component found for block type: ${block.blockType}`);
					return (
						<div key={block.id || index} style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: '4px', margin: '8px 0', padding: '8px' }}>
							<strong style={{ color: '#856404', fontSize: '12px' }}>Unknown block type: {block.blockType}</strong>
							<pre style={{ fontSize: '11px', marginTop: '4px', overflow: 'auto' }}>
								{JSON.stringify(block, null, 2)}
							</pre>
						</div>
					);
				}

				// Extract block data (everything except blockType and id)
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { blockType: _blockType, id, ...blockData } = block;

				// Build style object from block data if styling fields exist
				const blockStyle: React.CSSProperties = {
					...(blockData.backgroundColor && { backgroundColor: blockData.backgroundColor as string }),
					...(blockData.color && { color: blockData.color as string }),
					...(blockData.padding && typeof blockData.padding === 'object' && {
						paddingBottom: `${(blockData.padding as { bottom?: number }).bottom || 0}px`,
						paddingLeft: `${(blockData.padding as { left?: number }).left || 0}px`,
						paddingRight: `${(blockData.padding as { right?: number }).right || 0}px`,
						paddingTop: `${(blockData.padding as { top?: number }).top || 0}px`,
					}),
					...(blockData.margin && typeof blockData.margin === 'object' && {
						marginBottom: `${(blockData.margin as { bottom?: number }).bottom || 0}px`,
						marginLeft: `${(blockData.margin as { left?: number }).left || 0}px`,
						marginRight: `${(blockData.margin as { right?: number }).right || 0}px`,
						marginTop: `${(blockData.margin as { top?: number }).top || 0}px`,
					}),
					...(blockData.width && { width: blockData.width as string }),
					...(blockData.maxWidth && { maxWidth: blockData.maxWidth as string }),
					...(blockData.textAlign && { textAlign: blockData.textAlign as React.CSSProperties['textAlign'] }),
					...(blockData.className && {}), // className is passed separately
				};

				return (
					<BlockComponent
						key={id || index}
						className={blockData.className as string}
						style={blockStyle}
						{...blockData}
					/>
				);
			})}
		</div>
	);
}

/* * */

/**
 * Hook to fetch a full page from Payload CMS with all blocks
 *
 * @example
 * const { blocks, page, isLoading, error } = usePayloadPage('pages', 'home-page-slug');
 */
export function usePayloadPage(
	collection: string,
	identifier: string, // Can be id, slug, or any unique field
	identifierField = 'slug', // Field to search by (slug, id, etc.)
	baseUrl?: string,
) {
	const apiBaseUrl = baseUrl || 'http://localhost:49002';
	// Payload API query format: /api/collection?where[field][equals]=value
	const payloadApiUrl = `${apiBaseUrl}/api/${collection}?where[${identifierField}][equals]=${identifier}`;

	const { data, error, isLoading } = useSWR<{ docs?: unknown[] }>(payloadApiUrl);

	const page = React.useMemo(() => {
		if (!data) return null;
		const docs = data.docs || [];
		return docs.length > 0 ? (docs[0] as Record<string, unknown>) : null;
	}, [data]);

	// Extract blocks - common field names: layout, blocks, content
	const blocks = React.useMemo(() => {
		if (!page) return [];
		const blocksField = (page.layout || page.blocks || page.content) as PayloadBlock[] | undefined;
		return Array.isArray(blocksField) ? blocksField : [];
	}, [page]);

	useEffect(() => {
		console.group('🔍 Payload CMS Data Structure');
		console.log('📡 API URL:', payloadApiUrl);
		console.log('📦 Raw API Response:', JSON.stringify(data, null, 2));
		console.log('📄 Full Page Object:', JSON.stringify(page, null, 2));
		console.log('🧩 Blocks Array:', JSON.stringify(blocks, null, 2));
		console.log('🔢 Blocks Count:', blocks.length);
		if (blocks.length > 0) {
			console.log('📋 Block Types Found:', blocks.map(b => b.blockType));
			blocks.forEach((block, index) => {
				console.log(`\n🧱 Block #${index + 1} (${block.blockType}):`, JSON.stringify(block, null, 2));
			});
		}
		console.log('⏳ Loading:', isLoading);
		console.log('❌ Error:', error);
		console.groupEnd();
	}, [blocks, page, error, isLoading, payloadApiUrl, data]);

	return {
		blocks,
		error,
		isLoading,
		page,
	};
}
