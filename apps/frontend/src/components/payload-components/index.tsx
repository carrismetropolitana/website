'use client';

import { LineBadge } from '@/components/lines/LineBadge';
import { NewsData } from '@/types/news.types';
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react';
import React from 'react';

interface PayloadNewsProps {
	data: NewsData
}

interface MentionInlineNode {
	id?: string
	label?: string
	mentionType?: string
	type?: string
}

function collectLineMentionIds(value: unknown): string[] {
	const ids = new Set<string>();

	const visit = (node: unknown) => {
		if (!node || typeof node !== 'object') return;

		const maybe = node as MentionInlineNode & { children?: unknown[] };
		if (maybe.type === 'mention' && (maybe.mentionType ?? 'line') === 'line' && maybe.id) {
			ids.add(String(maybe.id));
		}

		const children = (node as { children?: unknown }).children;
		if (Array.isArray(children)) {
			children.forEach(visit);
		}

		// Also traverse other nested objects/arrays defensively (Lexical JSON can be nested)
		for (const v of Object.values(node as Record<string, unknown>)) {
			if (Array.isArray(v)) v.forEach(visit);
			else if (v && typeof v === 'object') visit(v);
		}
	};

	visit(value);
	return Array.from(ids);
}

export default function PayloadNews({ data }: PayloadNewsProps) {
	//

	//
	// A. Render Components

	const bodyJSON = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
	const lineMentionIds = data.body ? collectLineMentionIds(bodyJSON) : [];

	return (
		<div style={{ border: '2px dashed #aaa', marginTop: 32, padding: 24 }}>

			{data.body && (
				<section style={{ marginTop: 24 }}>
					<h3>Body Content</h3>
					<PayloadRichText data={bodyJSON} />
					<div style={{ marginTop: 12 }}>
						<div>LINES:</div>
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
							{lineMentionIds.map(id => (
								<LineBadge key={id} lineId={id} size="md" />
							))}
						</div>
					</div>
				</section>
			)}

			<details style={{ marginTop: 24 }}>
				<summary>Raw JSON</summary>
				<pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
			</details>
		</div>
	);

	//
}
