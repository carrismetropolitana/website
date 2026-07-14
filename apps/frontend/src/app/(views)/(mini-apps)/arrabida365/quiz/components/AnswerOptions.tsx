import styles from '../styles.module.css';

import { Question } from '../data';

interface AnswerOptionsProps {
	currentQ: Question
	onAnswerSelect: (value: string) => void
	selectedAnswer: string
}

export function AnswerOptions({
	currentQ,
	onAnswerSelect,
	selectedAnswer,
}: AnswerOptionsProps) {
	return (
		<div className={styles.answerOptions}>
			{currentQ.options.map(option => (
				<label key={option.value} className={styles.answerOption}>
					<input
						checked={selectedAnswer === option.value}
						className={styles.answerRadio}
						name={`q${currentQ.id}`}
						onChange={() => onAnswerSelect(option.value)}
						type="radio"
						value={option.value}
					/>

					<div className={styles.answerCard}>
						<div className={styles.radioCircle} />

						<div className={styles.answerText}>
							<span className={styles.answerLabel}>
								{option.label}
							</span>

							<span className={styles.answerDescription}>
								{option.description}
							</span>
						</div>
					</div>
				</label>
			))}
		</div>
	);
}
