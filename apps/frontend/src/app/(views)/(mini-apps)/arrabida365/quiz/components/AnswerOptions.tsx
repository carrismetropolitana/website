import styles from '../styles.module.css';
import { Question } from '../data';

type AnswerOptionsProps = {
	currentQ: Question;
	selectedAnswer: string;
	onAnswerSelect: (value: string) => void;
};

export function AnswerOptions({
	currentQ,
	selectedAnswer,
	onAnswerSelect,
}: AnswerOptionsProps) {
	return (
		<div className={styles.answerOptions}>
			{currentQ.options.map((option) => (
				<label key={option.value} className={styles.answerOption}>
					<input
						type="radio"
						name={`q${currentQ.id}`}
						value={option.value}
						checked={selectedAnswer === option.value}
						onChange={() => onAnswerSelect(option.value)}
						className={styles.answerRadio}
					/>

					<div className={styles.answerCard}>
						<div className={styles.radioCircle}></div>

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