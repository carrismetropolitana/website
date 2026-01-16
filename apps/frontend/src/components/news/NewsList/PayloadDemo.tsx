/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = async (url: string) => {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
	return res.json();
};

export default function PayloadFullDemo({ newsId }: { newsId: string }) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setReady(true);
	}, []);

	const { data, error, isLoading } = useSWR(
		newsId ? `/api/payload-news/${newsId}` : null,
		fetcher,
	);

	if (!ready || isLoading) return <p>Loading…</p>;
	if (error) return <p>Error loading content</p>;
	if (!data) return <p>No content found</p>;

	const page = data.doc ?? data;
	const { body, layout, summary, title } = page;

	return (
		<div style={{ border: '2px dashed #aaa', marginTop: 32, padding: 24 }}>
			<h2>{title}</h2>
			{summary && <h4 style={{ opacity: 0.8 }}>{summary}</h4>}

			{layout?.length ? (
				<>
					{layout.map((block: any, idx: number) => (
						<div key={idx}>{block.blockType}</div>
					))}
				</>
			) : (
				<p>No layout blocks</p>
			)}

			{body && (
				<section style={{ marginTop: 24 }}>
					<h3>Body Content</h3>
					<PayloadRichText data={body} />
				</section>
			)}

			<details style={{ marginTop: 24 }}>
				<summary>Raw JSON</summary>
				<pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(page, null, 2)}</pre>
			</details>
		</div>
	);
}
