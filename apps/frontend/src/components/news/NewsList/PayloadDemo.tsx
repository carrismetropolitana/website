'use client';

/* * */

import type React from 'react';

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import useSWR from 'swr';

/* * */

interface PayloadDemoProps {
	baseUrl?: string // Optional: override the base URL
	collection?: string // e.g., 'news', 'notes', 'topics', etc.
	limit?: number // Number of records to display (default: 1)
}

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

// Helper function to format field values
function formatFieldValue(key: string, value: unknown): React.ReactNode {
	// Handle null/undefined
	if (value === null || value === undefined) {
		return <span style={{ color: '#999', fontStyle: 'italic' }}>null</span>;
	}

	// Handle arrays
	if (Array.isArray(value)) {
		if (value.length === 0) return <span style={{ color: '#999' }}>[]</span>;
		return (
			<ul style={{ margin: 0, paddingLeft: '20px' }}>
				{value.map((item, index) => (
					<li key={index}>{formatFieldValue(`${key}[${index}]`, item)}</li>
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
						<strong>{objKey}:</strong> {formatFieldValue(objKey, objValue)}
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

export function PayloadDemo({ baseUrl, collection = 'news', limit = 1 }: PayloadDemoProps) {
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
												{formatFieldValue(key, value)}
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
