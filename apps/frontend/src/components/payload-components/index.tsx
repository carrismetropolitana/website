'use client';

/* * */

import { useDebugContext } from '@/contexts/Debug.context';
import { NewsData } from '@/types/news.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

/* * */

interface PayloadNewsProps {
	data: NewsData
}

/* * */

export default function PayloadNews({ data }: PayloadNewsProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const debugContext = useDebugContext();

	const bodyJSON = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
	const rootNode = bodyJSON?.root || bodyJSON;

	//
	// B. Render components

	return (
		<>

			{data.body && rootNode && (
				<section style={{ marginTop: 24 }}>
					{renderLexicalNode(rootNode)}
				</section>
			)}

			{debugContext.flags.is_debug_mode && (
				<details style={{ marginTop: 24 }}>
					<summary>Raw JSON</summary>
					<pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
				</details>
			)}

		</>
	);

	//
}
