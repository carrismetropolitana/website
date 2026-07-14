import { Question } from '../data';
import { AnswerOptions } from './AnswerOptions';
import { QuestionHeader } from './QuestionHeader';
import { QuestionIllustration } from './QuestionIllustration';
import { QuizProgress } from './QuizProgress';
import styles from '../styles.module.css';

type QuestionBlockProps = {
	currentQ: Question;
	currentQuestion: number;
	totalQuestions: number;
	progress: number;
	selectedAnswer: string;
	questionIllustrations: Record<string, any>;
	onAnswerSelect: (value: string) => void;
};

export function QuestionBlock({
	currentQ,
	currentQuestion,
	totalQuestions,
	progress,
	selectedAnswer,
	questionIllustrations,
	onAnswerSelect,
}: QuestionBlockProps) {
	return (
		<div className={styles.questionContent}>
			<QuizProgress
				currentQuestion={currentQuestion}
				totalQuestions={totalQuestions}
				progress={progress}
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
				selectedAnswer={selectedAnswer}
				onAnswerSelect={onAnswerSelect}
			/>
		</div>
	);
}