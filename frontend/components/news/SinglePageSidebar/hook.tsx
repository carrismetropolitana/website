/**
 * Custom hook to parse HTML and generate Table of Contents tree.
 */

import { NewsData } from '@/types/news.types';
import { useEffect, useState } from 'react';

// Define the types for Heading and TOC item
interface Heading {
	id: string
	level: number
	text: string
}

export interface TocTreeItem extends Heading {
	children: TocTreeItem[]
	parent?: TocTreeItem
}

// Custom hook to parse HTML and generate TOC tree
export default function useHook(news: NewsData): TocTreeItem[] {
	const [toc, setToc] = useState<TocTreeItem[]>([]);

	// Function to parse HTML and extract headings
	const parseHeadings = (news: NewsData): Heading[] => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(news.content, 'text/html');
		const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));

		const res: Heading[] = [
		];

		headings.forEach((heading) => {
			const id = heading.id;
			const level = parseInt(heading.tagName[1]);
			const text = heading.textContent || '';
			res.push({ id, level, text });
		});

		return res;
	};

	// Function to build a tree structure from headings
	const buildTocTree = (headings: Heading[]): TocTreeItem[] => {
		const toc: TocTreeItem[] = [];
		let current: TocTreeItem | undefined = { children: toc, id: '', level: 0, text: '' };

		headings.forEach((heading) => {
			const item: TocTreeItem = { ...heading, children: [] };

			if (heading.level === 1) {
				toc.push(item);
				current = item;
			}
			else {
				let parent = current;
				while (parent && parent.level >= heading.level) {
					parent = parent.parent;
				}
				item.parent = parent;
				parent?.children.push(item);
				current = item;
			}
		});

		return toc;
	};

	useEffect(() => {
		const headings = parseHeadings(news);
		const tocTree = buildTocTree(headings);
		setToc(tocTree);
	}, [news]);

	return toc;
};
