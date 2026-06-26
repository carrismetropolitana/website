import styles from '../styles.module.css';

type QuestionNavigationProps = {
	currentQuestion: number;
	totalQuestions: number;
	selectedAnswer: string;
	onBack: () => void;
	onNext: () => void;
};

export function QuestionNavigation({
	currentQuestion,
	totalQuestions,
	selectedAnswer,
	onBack,
	onNext,
}: QuestionNavigationProps) {
	return (
		<div className={styles.actionArea}>
			<div className={styles.navigationButtons}>
				{currentQuestion > 0 && (
					<button type="button" className={styles.secondaryButton} onClick={onBack}>
						Voltar
					</button>
				)}

				<button
					type="button"
					className={`${styles.primaryButton} ${currentQuestion === 0 ? styles.fullWidth : ''}`}
					onClick={onNext}
					disabled={!selectedAnswer}
				>
					{currentQuestion === totalQuestions - 1 ? 'Ver Resultados' : 'Seguinte'}

					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
			</div>
		</div>
	);
}