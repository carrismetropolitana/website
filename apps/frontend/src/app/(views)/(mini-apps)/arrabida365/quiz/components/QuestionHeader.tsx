import styles from '../styles.module.css';

interface QuestionHeaderProps {
	currentQuestion: number
	questionText: string
}

export function QuestionHeader({
	currentQuestion,
	questionText,
}: QuestionHeaderProps) {
	return (
		<div className={styles.questionHeader}>
			<div className={styles.questionBadge}>
				<svg className={styles.questionIcon} fill="none" viewBox="0 0 22 22">
					<path d="M11 1 A10 10 0 0 1 11 21" fill="none" stroke="#FFD300" strokeLinecap="round" strokeWidth="2" />
					<path d="M11 21 A10 10 0 0 1 11 1" fill="none" stroke="#FFD300" strokeDasharray="3.5 3" strokeLinecap="round" strokeWidth="2" />
					<text fill="#FFD300" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" textAnchor="middle" x="11" y="15.5">?</text>
				</svg>

				<span>Pergunta {currentQuestion + 1}</span>
			</div>

			<h2 className={styles.questionTitle}>{questionText}</h2>
		</div>
	);
}
