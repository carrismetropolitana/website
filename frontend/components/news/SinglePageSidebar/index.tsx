'use client';

import { NewsData } from '@/types/news.types';
/* * */

import { Link } from '@/i18n/routing';
import { useEffect, useState } from 'react';

import useHook, { TocTreeItem } from './hook';
import styles from './styles.module.css';

/* * */

export default function Component({ newsData }: { newsData: NewsData }) {
	//
	// A. Setup variables
	const tableOfContents = useHook(newsData);
	const [activeId, setActiveId] = useState<null | string>(null);

	//
	// B. Transform Data
	// State to track the active section

	// B. Handle scroll and update active section
	useEffect(() => {
		/**
		 * Handles the scroll event to update the active header in the Table of Contents.
		 *
		 * This function finds all elements with an ID in the Table of Contents, including nested headers.
		 * It then checks if each header is in the viewport and sets the active header ID based on the
		 * first header that is within the viewport.
		 *
		 * @returns {void}
		 */
		function handleScroll() {
			// Find all elements with an ID in Table of Contents
			const headers = tableOfContents.map((item) => {
				if (item.children.length > 0) {
					return [document.getElementById(item.id), ...item.children.map(child => document.getElementById(child.id))];
				}
				return [document.getElementById(item.id)];
			}).flat();

			// For each nested header, check if it's in the viewport
			const activeHeader = headers.reverse().find((header) => {
				if (!header) return false;
				const rect = header.getBoundingClientRect();
				return rect.bottom < 600;
			});

			setActiveId(activeHeader ? activeHeader.id : null);
		}

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [tableOfContents]);

	//
	// D. Render Components

	function TocItem({ item }: { item: TocTreeItem }) {
		const isActive = item.id === activeId;

		return (
			<li>
				<Link className={isActive ? styles.active : ''} href={`#${item.id}`} replace>{item.text}</Link>
				{item.children.length > 0 && (
					<ul>
						{item.children.map(child => (
							<TocItem key={child.id} item={child} />
						))}
					</ul>
				)}
			</li>
		);
	};

	return (
		<nav className={styles.nav}>
			<ul>
				{tableOfContents.map(item => (
					<TocItem key={item.id} item={item} />
				))}
			</ul>
		</nav>
	);

	//
}
