import styles from '../styles.module.css';

type QuestionHeaderProps = {
	currentQuestion: number;
	questionText: string;
};

export function QuestionHeader({
	currentQuestion,
	questionText,
}: QuestionHeaderProps) {
	return (
		<div className={styles.questionHeader}>
			<div className={styles.questionBadge}>
				<svg viewBox="0 0 22 22" fill="none" className={styles.questionIcon}>
					<path d="M11 1 A10 10 0 0 1 11 21" stroke="#FFD300" strokeWidth="2" fill="none" strokeLinecap="round"/>
					<path d="M11 21 A10 10 0 0 1 11 1" stroke="#FFD300" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3.5 3"/>
					<text x="11" y="15.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFD300" fontFamily="Inter, sans-serif">?</text>
				</svg>

				<span>Pergunta {currentQuestion + 1}</span>
			</div>

			<h2 className={styles.questionTitle}>{questionText}</h2>
		</div>
	);
}