/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import styles from './styles.module.css';

import afterShareBus from './assets/after-share-bus.svg';
import questionAImage from './assets/question-a.svg';
import questionBImage from './assets/question-b.svg';
import questionCImage from './assets/question-c.svg';
import questionDImage from './assets/question-d.svg';
import questionEImage from './assets/question-e.svg';
import resultAImage from './assets/result-a.svg';
import resultBImage from './assets/result-b.svg';
import resultCImage from './assets/result-c.svg';
import resultDImage from './assets/result-d.svg';
import { AfterShareScreen } from './components/AfterShareScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { QuizHeader } from './components/QuizHeader';
import { ResultScreen } from './components/ResultScreen';
import { StartScreen } from './components/StartScreen';
import { questions } from './data';
import { useQuizController } from './useQuizController';

const resultImages: Record<string, any> = {
	'result-a.svg': resultAImage,
	'result-b.svg': resultBImage,
	'result-c.svg': resultCImage,
	'result-d.svg': resultDImage,
};

const questionIllustrations: Record<string, any> = {
	'question-a': questionAImage,
	'question-b': questionBImage,
	'question-c': questionCImage,
	'question-d': questionDImage,
	'question-e': questionEImage,
};

export default function QuizPage() {
	const {
		currentQ,
		currentQuestion,
		handleAnswerSelect,
		handleBack,
		handleCopyLink,
		handleNext,
		handleRestart,
		handleShare,
		handleStart,
		isSharing,
		progress,
		result,
		screen,
		selectedAnswer,
		setScreen,
		shareMessage,
		showConfetti,
	} = useQuizController();

	return (
		<div className={styles.appWrapper}>
			<div className={styles.appContainer}>
				{/* Header */}
				<QuizHeader />

				{/* Start Screen */}
				{screen === 'start' && <StartScreen onStart={handleStart} />}

				{/* Question Screen */}

				{screen === 'question' && currentQ && (
					<QuestionScreen
						currentQ={currentQ}
						currentQuestion={currentQuestion}
						onAnswerSelect={handleAnswerSelect}
						onBack={handleBack}
						onNext={handleNext}
						progress={progress}
						questionIllustrations={questionIllustrations}
						selectedAnswer={selectedAnswer}
						totalQuestions={questions.length}
					/>
				)}

				{/* Loading Screen */}
				{screen === 'loading' && <LoadingScreen />}

				{/* Result Screen */}
				{screen === 'result' && result && (
					<ResultScreen
						isSharing={isSharing}
						onCopyLink={handleCopyLink}
						onRestart={handleRestart}
						onShare={handleShare}
						result={result}
						resultImages={resultImages}
						shareMessage={shareMessage}
						showConfetti={showConfetti}
					/>
				)}

				{/* After Share Screen */}
				{screen === 'afterShare' && (
					<AfterShareScreen
						afterShareBus={afterShareBus}
						onBackToResult={() => setScreen('result')}
					/>
				)}

				{/* Share Overlay */}
				{/* isSharing && <div className={styles.shareOverlay} /> */}
			</div>
		</div>
	);
}
