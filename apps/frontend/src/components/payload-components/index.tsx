'use client';

import { NewsData } from '@/types/news.types';
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react';
import React from 'react';

interface PayloadNewsProps {
	data: NewsData
}

export default function PayloadNews({ data }: PayloadNewsProps) {
	//

	//
	// A. Render Components

	return (
		<div style={{ border: '2px dashed #aaa', marginTop: 32, padding: 24 }}>

			{data.body && (
				<section style={{ marginTop: 24 }}>
					<h3>Body Content</h3>
					<PayloadRichText data={typeof data.body === 'string' ? JSON.parse(data.body) : data.body} />
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
