'use client';
/* * */

import { usePipsContext } from '@/contexts/Pips.context';

import styles from './styles.module.css';

/* * */

export default function FrontendPipSurveyAnswer({ description, id, title }) {
	//

	//
	// A. Setup variables

	const pipsContext = usePipsContext();

	//
	// B. Handle actions

	const handleSelectAnswer = (answerCode: string) => {
		pipsContext.actions.selectAnswer(answerCode);
	};

	//
	// C. Render components

	return (
		<div className={styles.container} onClick={() => handleSelectAnswer(id)}>
			<p className={styles.title}>{title}</p>
			<p className={styles.description}>{description}</p>
		</div>
	);

	//
}
