import { Question } from '../data';
import { QuestionBlock } from './QuestionBlock';
import { QuestionNavigation } from './QuestionNavigation';
import styles from '../styles.module.css';

type QuestionScreenProps = {
	currentQ: Question;
	currentQuestion: number;
	totalQuestions: number;
	progress: number;
	selectedAnswer: string;
	questionIllustrations: Record<string, any>;
	onAnswerSelect: (value: string) => void;
	onBack: () => void;
	onNext: () => void;
};

export function QuestionScreen({
	currentQ,
	currentQuestion,
	totalQuestions,
	progress,
	selectedAnswer,
	questionIllustrations,
	onAnswerSelect,
	onBack,
	onNext,
}: QuestionScreenProps) {
	return (
		<div className={styles.contentContainer}>
			<QuestionBlock
				currentQ={currentQ}
				currentQuestion={currentQuestion}
				totalQuestions={totalQuestions}
				progress={progress}
				selectedAnswer={selectedAnswer}
				questionIllustrations={questionIllustrations}
				onAnswerSelect={onAnswerSelect}
			/>

			<QuestionNavigation
				currentQuestion={currentQuestion}
				totalQuestions={totalQuestions}
				selectedAnswer={selectedAnswer}
				onBack={onBack}
				onNext={onNext}
			/>
		</div>
	);
}