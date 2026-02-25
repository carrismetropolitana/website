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

	const handleSelectAnswer = () => {
		pipsContext.selectAnswer(id);
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
