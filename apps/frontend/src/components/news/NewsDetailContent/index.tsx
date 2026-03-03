'use client';

/* * */

import { useDebugContext } from '@/contexts/Debug.context';
import { NewsData } from '@/types/news.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface NewsDetailContentProps {
	data: NewsData
}

/* * */

export function NewsDetailContent({ data }: NewsDetailContentProps) {
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

				<section className={styles.content}>

					{renderLexicalNode(rootNode)}

					{debugContext.flags.is_debug_mode && (
						<details>
							<summary>Raw Lexical JSON</summary>
							<pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
						</details>
					)}
				</section>

			)}

		</>
	);

	//
}
