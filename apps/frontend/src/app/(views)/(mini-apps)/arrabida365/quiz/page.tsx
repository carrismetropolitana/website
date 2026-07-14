'use client';

import { questions } from './data';
import { useQuizController } from './useQuizController';
import styles from './styles.module.css';
import afterShareBus from './assets/after-share-bus.svg';
import resultAImage from './assets/result-a.svg';
import resultBImage from './assets/result-b.svg';
import resultCImage from './assets/result-c.svg';
import resultDImage from './assets/result-d.svg';
import questionAImage from './assets/question-a.svg';
import questionBImage from './assets/question-b.svg';
import questionCImage from './assets/question-c.svg';
import questionDImage from './assets/question-d.svg';
import questionEImage from './assets/question-e.svg';
import { QuizHeader } from './components/QuizHeader';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { StartScreen } from './components/StartScreen';
import { AfterShareScreen } from './components/AfterShareScreen';
import { QuestionScreen } from './components/QuestionScreen';

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
      screen,
      currentQuestion,
      selectedAnswer,
      result,
      showConfetti,
      shareMessage,
      isSharing,
      progress,
      currentQ,
      handleStart,
      handleAnswerSelect,
      handleNext,
      handleBack,
      handleShare,
      handleCopyLink,
      handleRestart,
      setScreen,
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
            totalQuestions={questions.length}
            progress={progress}
            selectedAnswer={selectedAnswer}
            questionIllustrations={questionIllustrations}
            onAnswerSelect={handleAnswerSelect}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        
        {/* Loading Screen */}
        {screen === 'loading' && <LoadingScreen />}

        {/* Result Screen */}
        {screen === 'result' && result && (
          <ResultScreen
            result={result}
            resultImages={resultImages}
            showConfetti={showConfetti}
            shareMessage={shareMessage}
            isSharing={isSharing}
            onRestart={handleRestart}
            onShare={handleShare}
            onCopyLink={handleCopyLink}
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
        {/*isSharing && <div className={styles.shareOverlay} />*/}
      </div>
    </div>
  );
}