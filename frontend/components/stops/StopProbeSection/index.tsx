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

import styles from './styles.module.css';

/* * */

interface Props {
	description?: string
	selectedStop: string
	title: string
}

/* * */

const TOTAL_QUESTIONS = 4;

/* * */

export function StopProbeSection({ description, selectedStop, title }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.Probe');

	const [isProbeEnded, setProbeEnded] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [isMessageShown, setIsMessageShown] = useState<boolean>(true);
	const [hasParticipatedOnThisStop, setHasParticipatedOnThisStop] = useState<boolean>(false);
	const [hasOptedOut, setOptedOut] = useState<string>('false');
	const [stopQuestion1Answer, setQuestion1Answer] = useState<string | undefined>(undefined);
	const [stopQuestion2Answer, setQuestion2Answer] = useState<string | undefined>(undefined);
	const [stopQuestion3Answer, setQuestion3Answer] = useState<string | undefined>(undefined);
	const [stopQuestion4Answer, setQuestion4Answer] = useState<string | undefined>(undefined);
	const [progress, setProgress] = useState<number>(0);

	//
	// B. Handle actions

	useEffect(() => {
		const ended = localStorage.getItem(`Stops${selectedStop}|ProbeEnded`);
		const optedOut = localStorage.getItem('Stops|ProbeOptOut');
		const currentQuestion = parseInt(localStorage.getItem(`Stops${selectedStop}|ProbeCurrentPage`) || '0');
		const messageShown = localStorage.getItem(`Stops${selectedStop}|EndingMessageShown`) === 'true';
		const stopIdsLocal = localStorage.getItem('Stops|StopIds');
		const answer1 = localStorage.getItem(`Stops${selectedStop}|Question1Answer`);
		const answer2 = localStorage.getItem(`Stops${selectedStop}|Question2Answer`);
		const answer3 = localStorage.getItem(`Stops${selectedStop}|Question3Answer`);
		const answer4 = localStorage.getItem(`Stops${selectedStop}|Question4Answer`);
		const hasParticipatedOnThisStop = stopIdsLocal?.includes(selectedStop);

		if (optedOut === 'false') {
			setOptedOut('false');
		}
		else {
			setOptedOut('true');
		}

		if (optedOut === 'true') {
			setProbeEnded(true);
			setIsMessageShown(true);
			return;
		}

		if (hasParticipatedOnThisStop) {
			if (ended === 'false' && hasParticipatedOnThisStop) {
				setHasParticipatedOnThisStop(false);
			}
			setCurrentPage(currentQuestion);
			console.log(optedOut);
			if (ended === 'true' && currentQuestion === TOTAL_QUESTIONS) {
				setProbeEnded(true);
			}

			setIsMessageShown(messageShown);
			setQuestion1Answer(answer1 || undefined);
			setQuestion2Answer(answer2 || undefined);
			setQuestion3Answer(answer3 || undefined);
			setQuestion4Answer(answer4 || undefined);
		}
		else {
			setHasParticipatedOnThisStop(false);
			setCurrentPage(0);
			setProbeEnded(false);
			setIsMessageShown(false);
			setQuestion1Answer('');
			setQuestion2Answer('');
			setQuestion3Answer('');
			setQuestion4Answer('');
			setOptedOut('notdefined');
		}
	}, [selectedStop]);

	useEffect(() => {
		const progressPercentage = (currentPage / TOTAL_QUESTIONS) * 100;
		setProgress(progressPercentage);
	}, [currentPage]);

	const handleParticipation = () => {
		const currentQuestion = currentPage + 1;
		const participatedOn = localStorage.getItem('Stops|StopIds') || '';

		console.log('You opted in.');
		localStorage.setItem('Stops|ProbeOptIn', 'true');
		localStorage.setItem('Stops|ProbeOptOut', 'false');
		localStorage.setItem('Stops|ProbeFirstTime', 'false');
		localStorage.setItem(`Stops${selectedStop}|ProbeEnded`, 'false');
		localStorage.setItem(`Stops${selectedStop}|ProbeCurrentPage`, currentQuestion.toString());
		const updatedParticipatedOn = participatedOn ? [...participatedOn.split(','), selectedStop] : [selectedStop];
		localStorage.setItem('Stops|StopIds', updatedParticipatedOn.join(','));
		localStorage.setItem(`Stops${selectedStop}|EndingMessageShown`, 'false');
		localStorage.setItem(`Stops${selectedStop}|Question1Answer`, '');
		localStorage.setItem(`Stops${selectedStop}|Question2Answer`, '');
		localStorage.setItem(`Stops${selectedStop}|Question3Answer`, '');
		localStorage.setItem(`Stops${selectedStop}|Question4Answer`, '');

		setCurrentPage(currentQuestion);
		setProbeEnded(false);
	};

	const handleOptOut = () => {
		console.log('You opted out.');
		localStorage.setItem('Stops|ProbeOptIn', 'false');
		localStorage.setItem('Stops|ProbeOptOut', 'true');
		localStorage.setItem('Stops|ProbeFirstTime', 'false');
		localStorage.setItem(`Stops${selectedStop}|ProbeEnded`, 'true');
		localStorage.setItem(`Stops${selectedStop}|EndingMessageShown`, 'true');
		setProbeEnded(true);
	};

	const handleNextQuestion = () => {
		const nextPage = currentPage + 1;
		if (nextPage > TOTAL_QUESTIONS) {
			console.log('Probe ended');
			localStorage.setItem(`Stops${selectedStop}|ProbeEnded`, 'true');
			localStorage.setItem(`Stops${selectedStop}|EndingMessageShown`, 'true');
			localStorage.setItem(`Stops${selectedStop}|EndingMessageShown`, 'true');
			setProbeEnded(true);
			return;
		}
		setCurrentPage(nextPage);
		localStorage.setItem(`Stops${selectedStop}|ProbeCurrentPage`, nextPage.toString());
	};

	const renderQuestion = () => {
		switch (currentPage) {
			case 1:
				return <Question1 question1Answer={stopQuestion1Answer || ''} stopId={selectedStop} />;
			case 2:
				return <Question2 question2Answer={stopQuestion2Answer || ''} stopId={selectedStop} />;
			case 3:
				return <Question3 question3Answer={stopQuestion3Answer || ''} stopId={selectedStop} />;
			case 4:
				return <Question4 question4Answer={stopQuestion4Answer || ''} stopId={selectedStop} />;
			default:
				return null;
		}
	};

	return (
		<>
			{!isProbeEnded && !isMessageShown && !hasParticipatedOnThisStop && hasOptedOut !== 'true' ? (
				<Surface>
					<Section withGap withPadding>
						{currentPage > 0 && (
							<Progress className={styles.progressBar} color="green" transitionDuration={800} value={progress} />
						)}

						{currentPage === 0 && (
							<StopProbeHeader description={description} handleOptOut={handleOptOut} handleParticipation={handleParticipation} title={title} />
						)}

						{renderQuestion()}

						{currentPage > 0 && (
							<div className={styles.submitContainer}>
								<Button onClick={handleNextQuestion}>{t('submit')}</Button>
							</div>
						)}
					</Section>
				</Surface>
			) : isProbeEnded && !isMessageShown ? (
				<div className={styles.fadeOut}>
					<Surface>
						<Section withGap withPadding>
							<p>{t('endingMessage')}</p>
						</Section>
					</Surface>
				</div>
			) : null}
		</>
	);
}
