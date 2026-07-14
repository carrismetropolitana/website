/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from '../styles.module.css';

import { Question } from '../data';
import { AnswerOptions } from './AnswerOptions';
import { QuestionHeader } from './QuestionHeader';
import { QuestionIllustration } from './QuestionIllustration';
import { QuizProgress } from './QuizProgress';

interface QuestionBlockProps {
	currentQ: Question
	currentQuestion: number
	onAnswerSelect: (value: string) => void
	progress: number
	questionIllustrations: Record<string, any>
	selectedAnswer: string
	totalQuestions: number
}

export function QuestionBlock({
	currentQ,
	currentQuestion,
	onAnswerSelect,
	progress,
	questionIllustrations,
	selectedAnswer,
	totalQuestions,
}: QuestionBlockProps) {
	return (
		<div className={styles.questionContent}>
			<QuizProgress
				currentQuestion={currentQuestion}
				progress={progress}
				totalQuestions={totalQuestions}
			/>

			<QuestionHeader
				currentQuestion={currentQuestion}
				questionText={currentQ.text}
			/>

			<QuestionIllustration
				illustration={currentQ.illustration}
				questionIllustrations={questionIllustrations}
			/>

			<AnswerOptions
				currentQ={currentQ}
				onAnswerSelect={onAnswerSelect}
				selectedAnswer={selectedAnswer}
			/>
		</div>
	);
}
