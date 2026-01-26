'use client';

/* * */

import { useState } from 'react';

import styles from './styles.module.css';

import { Review2025CardSchema } from '../_data/cards';
import { Review2025CardContent } from '../Review2025CardContent';
import { Review2025CardFooter } from '../Review2025CardFooter';
import { Review2025CardHeader } from '../Review2025CardHeader';

/* * */

export default function Review2025Card({ data }: { data: Review2025CardSchema }) {
	//
	// A. Setup variables

	const [isOpen, setIsOpen] = useState(false);

	//
	// B. Handle actions

	const handleToggle = () => {
		setIsOpen(prev => !prev);
	};

	//
	// C. Render components

	return (
		<div className={styles.container} data-open={isOpen} style={{ borderColor: data.color }}>
			<Review2025CardHeader cardData={data} isOpen={isOpen} onToggle={handleToggle} />
			<Review2025CardContent cardData={data} isOpen={isOpen} />
			<Review2025CardFooter cardData={data} isOpen={isOpen} />
		</div>
	);

	//
}
