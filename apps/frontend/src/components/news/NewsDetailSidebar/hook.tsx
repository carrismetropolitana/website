import type { LexicalNode } from '@/types/lexical-node.types';

import { extractTextFromNode, slugify } from '@/utils/sidebarHelper';
import { useEffect, useState } from 'react';

/* * */

export interface TocHeading {
	id: string
	level: number
	text: string
}

/* * */

export default function useHook(newsBody: LexicalNode | string | undefined): TocHeading[] {
	//

	//
	// A. Setup variables

	const [headings, setHeadings] = useState<TocHeading[]>([]);

	//
	// B. Transform Data

	useEffect(() => {
		if (!newsBody) {
			setHeadings([]);
			return;
		}

		let parsedBody: LexicalNode | undefined | { root?: { children?: LexicalNode[] } };

		if (typeof newsBody === 'string') {
			try {
				parsedBody = JSON.parse(newsBody) as LexicalNode | { root?: { children?: LexicalNode[] } };
			}
			catch {
				setHeadings([]);
				return;
			}
		}
		else {
			parsedBody = newsBody;
		}

		const rootNode = (parsedBody && typeof parsedBody === 'object' && 'root' in parsedBody ? parsedBody.root : parsedBody) as LexicalNode | undefined | { children?: LexicalNode[] };
		if (!rootNode || !rootNode.children || !Array.isArray(rootNode.children)) {
			setHeadings([]);
			return;
		}

		const result: TocHeading[] = [];
		rootNode.children.forEach((child, index) => {
			if (child.type === 'heading' && child.tag) {
				const level = parseInt(child.tag.replace('h', '')) || 1;
				const text = extractTextFromNode(child);

				if (text && (level === 2 || level === 3)) {
					result.push({ id: `${slugify(text)}-${index}`, level, text });
				}
			}
		});

		setHeadings(result);
	}, [newsBody]);

	//
	// C. Return

	return headings;

	//
}
