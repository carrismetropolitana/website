'use client';

/* * */

import { useDebugContext } from '@/contexts/Debug.context';
import { NewsData } from '@/types/news.types';
import { getLexicalRoot, useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface NewsDetailContentProps {
	data: NewsData
}

/* * */

export function NewsDetailContent({ data }: NewsDetailContentProps) {
	//
	const renderLexicalNode = useRenderLexicalNode();
	const debugContext = useDebugContext();
	const rootNode = getLexicalRoot(data.body);

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
