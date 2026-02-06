'use client';

/* * */

import type { LexicalNode } from '@/types/lexical-node.types';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import useHook from './hook';
import styles from './styles.module.css';

/* * */

interface NewsDetailSidebarProps {
	newsBody: LexicalNode | string | undefined
}

/* * */

export function NewsDetailSidebar({ newsBody }: NewsDetailSidebarProps) {
	//

	//
	// A. Setup variables

	const headings = useHook(newsBody);
	const [activeId, setActiveId] = useState<null | string>(null);

	//
	// B. Handle scroll and update active section

	useEffect(() => {
		function handleScroll() {
			const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
			const active = elements.reverse().find((el) => {
				if (!el) return false;
				return el.getBoundingClientRect().bottom < 600;
			});
			setActiveId(active ? active.id : null);
		}

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [headings]);

	//
	// C. Render components

	return (
		<nav className={styles.nav}>
			<ul>
				{headings.map(heading => (
					<li key={heading.id} className={heading.level === 3 ? styles.nested : undefined}>
						<Link className={activeId === heading.id ? styles.active : undefined} href={`#${heading.id}`} replace>
							{heading.text}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);

	//
}
