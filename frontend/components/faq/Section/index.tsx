'use client';
import { Accordion } from '@mantine/core';
import { IconCaretLeftFilled } from '@tabler/icons-react';
import { FAQ, FAQItem } from 'app/api/faq/route';

import styles from './styles.module.css';

export default function Section({ items, title }: { items: FAQItem[], title: string }) {
	const renderedItems = items.map((item, index) => (
		<Accordion.Item key={index} value={item.title}>
			<Accordion.Control>{item.title}</Accordion.Control>
			<Accordion.Panel><div dangerouslySetInnerHTML={{ __html: item.body }} /></Accordion.Panel>
		</Accordion.Item>
	));
	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<p className={styles.label}>tópico</p>
				<h2>{title}</h2>
			</div>
			<div>
				<Accordion chevron={<IconCaretLeftFilled />} classNames={styles} defaultValue="Apples">
					{renderedItems}
				</Accordion>
			</div>
		</div>
	);
}
