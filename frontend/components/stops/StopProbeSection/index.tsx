/* * */
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { StopProbeHeader } from '@/components/stops/StopProbeHeader';
import { Question1 } from '@/components/stops/StopProbeQuestion1';
import { Question2 } from '@/components/stops/StopProbeQuestion2';
import { Question3 } from '@/components/stops/StopProbeQuestion3';
import { Question4 } from '@/components/stops/StopProbeQuestion4';
import { Button, Progress } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
/* * */
import styles from './styles.module.css';

interface Props {
	description?: string
	selectedStop: string
	title: string
}
/* * */
export function StopProbeSection({ description, selectedStop, title }: Props) {
	//

	//
	// A. Setup variables
	const t = useTranslations('stops.Probe');

	const [currentPage, setCurrentPage] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);
	const [isProbeEnded, setIsProbeEnded] = useState<boolean>(false);
	const [hasOptedOut, setHasOptedOut] = useState<boolean>(false);
	const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
	const [displayEndingMessage, setDisplayEndingMessage] = useState<boolean>(false);
	const questionComponents = [Question1, Question2, Question3, Question4];
	const TOTAL_QUESTIONS = 4;

	//
	// B. Fetch data

	useEffect(() => {
		const storedProbeEnded = localStorage.getItem(`Stops${selectedStop}|ProbeEnded`) === 'true';
		const endingShown = localStorage.getItem(`Stops${selectedStop}|EndingMessageShown`) === 'true';
		const storedCurrentPage = parseInt(localStorage.getItem(`Stops${selectedStop}|ProbeCurrentPage`) || '0');
		const storedAnswers = [
			localStorage.getItem(`Stops${selectedStop}|Question1Answer`) || '',
			localStorage.getItem(`Stops${selectedStop}|Question2Answer`) || '',
			localStorage.getItem(`Stops${selectedStop}|Question3Answer`) || '',
			localStorage.getItem(`Stops${selectedStop}|Question4Answer`) || '',
		];

		setCurrentPage(storedCurrentPage);
		setProgress((storedCurrentPage / TOTAL_QUESTIONS) * 100);
		setIsProbeEnded(storedProbeEnded);
		setHasOptedOut(localStorage.getItem('Stops|ProbeOptOut') === 'true');
		setAnswers(storedAnswers);
	}, [selectedStop]);

	//
	// C. Handle actions
	const handleParticipation = () => {
		localStorage.setItem('Stops|ProbeOptOut', 'false');
		localStorage.setItem(`Stops${selectedStop}|ProbeEnded`, 'false');
		// Reset the ending message flag for this stop.
		localStorage.setItem(`Stops${selectedStop}|EndingMessageShown`, 'false');
		localStorage.setItem(`Stops${selectedStop}|ProbeCurrentPage`, '1');

		setCurrentPage(1);
		setIsProbeEnded(false);
		setDisplayEndingMessage(false);
		setProgress((1 / TOTAL_QUESTIONS) * 100);
	};

	const handleOptOut = () => {
		localStorage.setItem('Stops|ProbeOptOut', 'true');
		localStorage.setItem(`Stops${selectedStop}|ProbeEnded`, 'true');
		localStorage.setItem(`Stops${selectedStop}|EndingMessageShown`, 'true');

		setIsProbeEnded(true);
		setHasOptedOut(true);
		setDisplayEndingMessage(false);
	};

	const handleNextQuestion = () => {
		const nextPage = currentPage + 1;
		if (nextPage > TOTAL_QUESTIONS) {
			// Mark the probe as ended
			localStorage.setItem(`Stops${selectedStop}|ProbeEnded`, 'true');
			setIsProbeEnded(true);
			// If the ending message has not been shown yet, display it now.
			if (localStorage.getItem(`Stops${selectedStop}|EndingMessageShown`) !== 'true') {
				localStorage.setItem(`Stops${selectedStop}|EndingMessageShown`, 'true');
				setDisplayEndingMessage(true);
			}
			return;
		}
		localStorage.setItem(`Stops${selectedStop}|ProbeCurrentPage`, nextPage.toString());
		setCurrentPage(nextPage);
		setProgress((nextPage / TOTAL_QUESTIONS) * 100);
	};

	// D. Render Components
	const renderQuestion = () => {
		const questionIndex = currentPage - 1;
		const QuestionComponent = questionComponents[questionIndex];
		return QuestionComponent ? (
			<QuestionComponent
				questionAnswer={`${currentPage}: ${answers[questionIndex]}`}
				stopId={selectedStop}
			/>
		) : null;
	};

	if (!isProbeEnded && !hasOptedOut) {
		return (
			<Surface>
				<Section withGap withPadding>
					{currentPage === 0 ? (
						<StopProbeHeader
							description={description}
							handleOptOut={handleOptOut}
							handleParticipation={handleParticipation}
							title={title}
						/>
					) : (
						<>
							<Progress
								className={styles.progressBar}
								color="green"
								transitionDuration={800}
								value={progress}
							/>
							{renderQuestion()}
							<div className={styles.submitContainer}>
								<Button onClick={handleNextQuestion}>{t('submit')}</Button>
							</div>
						</>
					)}
				</Section>
			</Surface>
		);
	}
	else if (isProbeEnded && !hasOptedOut && displayEndingMessage) {
		return (
			<Surface>
				<Section withGap withPadding>
					<p>{t('endingMessage')}</p>
				</Section>
			</Surface>
		);
	}
	return null;
	//
}
