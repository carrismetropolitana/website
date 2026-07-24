/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from '../styles.module.css';

import { Question } from '../data';
import { QuestionBlock } from './QuestionBlock';
import { QuestionNavigation } from './QuestionNavigation';

interface QuestionScreenProps {
	currentQ: Question
	currentQuestion: number
	onAnswerSelect: (value: string) => void
	onBack: () => void
	onNext: () => void
	progress: number
	questionIllustrations: Record<string, any>
	selectedAnswer: string
	totalQuestions: number
}

export function QuestionScreen({
	currentQ,
	currentQuestion,
	onAnswerSelect,
	onBack,
	onNext,
	progress,
	questionIllustrations,
	selectedAnswer,
	totalQuestions,
}: QuestionScreenProps) {
	return (
		<div className={styles.contentContainer}>
			<QuestionBlock
				currentQ={currentQ}
				currentQuestion={currentQuestion}
				onAnswerSelect={onAnswerSelect}
				progress={progress}
				questionIllustrations={questionIllustrations}
				selectedAnswer={selectedAnswer}
				totalQuestions={totalQuestions}
			/>

			<QuestionNavigation
				currentQuestion={currentQuestion}
				onBack={onBack}
				onNext={onNext}
				selectedAnswer={selectedAnswer}
				totalQuestions={totalQuestions}
			/>
		</div>
	);
}
