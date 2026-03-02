'use client';
/* * */

import { usePipsContext } from '@/contexts/Pips.context';

import styles from './styles.module.css';

/* * */

interface PipsSurveyOptionProps {
	answerCode: string
	description: string
	title: string
}

export function PipsSurveyOption({ answerCode, description, title }: PipsSurveyOptionProps) {
	//

	//
	// A. Setup variables

	const pipsContext = usePipsContext();

	//
	// B. Handle actions

	const handleSelectAnswer = () => {
		pipsContext.actions.selectAnswer(answerCode);
	};

	//
	// C. Render components

	return (
		<div className={styles.container} onClick={handleSelectAnswer}>
			<p className={styles.title}>{title}</p>
			<p className={styles.description}>{description}</p>
		</div>
	);

	//
}
