import styles from '../styles.module.css';

interface QuestionNavigationProps {
	currentQuestion: number
	onBack: () => void
	onNext: () => void
	selectedAnswer: string
	totalQuestions: number
}

export function QuestionNavigation({
	currentQuestion,
	onBack,
	onNext,
	selectedAnswer,
	totalQuestions,
}: QuestionNavigationProps) {
	return (
		<div className={styles.actionArea}>
			<div className={styles.navigationButtons}>
				{currentQuestion > 0 && (
					<button className={styles.secondaryButton} onClick={onBack} type="button">
						Voltar
					</button>
				)}

				<button
					className={`${styles.primaryButton} ${currentQuestion === 0 ? styles.fullWidth : ''}`}
					disabled={!selectedAnswer}
					onClick={onNext}
					type="button"
				>
					{currentQuestion === totalQuestions - 1 ? 'Ver Resultados' : 'Seguinte'}

					<svg fill="none" height="16" viewBox="0 0 16 16" width="16">
						<path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
					</svg>
				</button>
			</div>
		</div>
	);
}
