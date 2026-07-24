/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import styles from './styles.module.css';

import afterShareBus from './assets/after-share-bus.png';
import questionAImage from './assets/question-a.png';
import questionBImage from './assets/question-b.png';
import questionCImage from './assets/question-c.png';
import questionDImage from './assets/question-d.png';
import questionEImage from './assets/question-e.png';
import resultAImage from './assets/result-a.png';
import resultBImage from './assets/result-b.png';
import resultCImage from './assets/result-c.png';
import resultDImage from './assets/result-d.png';
import { AfterShareScreen } from './components/AfterShareScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { QuizHeader } from './components/QuizHeader';
import { ResultScreen } from './components/ResultScreen';
import { StartScreen } from './components/StartScreen';
import { questions } from './data';
import { useQuizController } from './useQuizController';

const resultImages: Record<string, any> = {
	'result-a.png': resultAImage,
	'result-b.png': resultBImage,
	'result-c.png': resultCImage,
	'result-d.png': resultDImage,
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
