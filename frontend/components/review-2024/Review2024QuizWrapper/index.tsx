'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allQuizData, type Review2024QuizAnswerSchema } from '@/components/review-2024/_data/quiz';
import { Review2024QuizFinalResult } from '@/components/review-2024/Review2024QuizFinalResult';
import { Review2024QuizPoints } from '@/components/review-2024/Review2024QuizPoints';
import { Review2024QuizQuestion } from '@/components/review-2024/Review2024QuizQuestion';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	answerStatus: 'correct' | 'wrong' | null
	points: number
	progress: number
	setAnswerStatus: (value: 'correct' | 'wrong' | null) => void
	setPoints: (value: number) => void
	setProgress: (value: number) => void
}

/* * */

export function Review2024QuizWrapper({ answerStatus, points, progress, setAnswerStatus, setPoints, setProgress }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024QuizWrapper');
	const analyticsContext = useAnalyticsContext();

	//
	// B. Handle actions

	const handleClickAnswerOption = (answerData: Review2024QuizAnswerSchema) => {
		if (answerStatus === null) {
			if (answerData.is_correct) {
				setAnswerStatus('correct');
				setPoints(points + (allQuizData[progress]?._points || 0));
				analyticsContext.actions.capture(ampli => ampli.viagem2024QuizAnswered({ [`question_${progress}`]: 'correct' }));
			}
			else {
				setAnswerStatus('wrong');
				analyticsContext.actions.capture(ampli => ampli.viagem2024QuizAnswered({ [`question_${progress}`]: 'wrong' }));
			}
		}
	};

	const handleAdvanceQuestion = () => {
		setAnswerStatus(null);
		setProgress(progress + 1);
	};

	//
	// C. Render components

	if (progress >= allQuizData.length) {
		return (
			<Surface variant="persistent" forceOverflow>
				<Section withPadding="desktop" withGap>
					<Review2024QuizFinalResult points={points} />
				</Section>
			</Surface>
		);
	}

	return (
		<Surface forceOverflow>
			<Grid columns="ab">

				<Section withPadding="desktop" withGap>
					<div className={styles.headingWrapper}>
						<h2 className={styles.heading}>{t('digital.heading')}</h2>
						<h5 className={styles.subheading}>{t('digital.subheading')}</h5>
					</div>
					<Review2024QuizPoints points={points} />
				</Section>

				<Section withPadding="desktop" withGap>
					<div className={styles.container}>
						<Review2024QuizQuestion
							answerStatus={answerStatus}
							onAnswer={handleClickAnswerOption}
							onClickNext={handleAdvanceQuestion}
							progress={progress}
							quizData={allQuizData[progress]}
						/>
					</div>
				</Section>

			</Grid>
		</Surface>
	);

	//
}
