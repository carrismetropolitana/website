import styles from '../styles.module.css';

interface QuizProgressProps {
	currentQuestion: number
	progress: number
	totalQuestions: number
}

export function QuizProgress({ currentQuestion, progress, totalQuestions }: QuizProgressProps) {
	return (
		<div className={styles.progressIndicator}>
			<div className={styles.progressHeader}>
				<span className={styles.progressLabel}>
					Passo {currentQuestion + 1} de {totalQuestions}
				</span>
				<span className={styles.progressPercent}>{Math.round(progress)}%</span>
			</div>

			<div className={styles.progressBar}>
				<div className={styles.progressFill} style={{ width: `${progress}%` }} />
			</div>
		</div>
	);
}
