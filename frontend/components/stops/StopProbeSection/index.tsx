import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Question1 } from '@/components/stops/StopProbeQuestion1';
import { Question2 } from '@/components/stops/StopProbeQuestion2';
import { Question3 } from '@/components/stops/StopProbeQuestion3';
import { Button, Progress } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { StopProbeHeader } from '../StopProbeHeader';
import { Question4 } from '../StopProbeQuestion4';
import styles from './styles.module.css';

interface Props {
	description?: string
	selectedStop: string
	title: string
}

export function StopProbeSection({ description, selectedStop, title }: Props) {
	//

	//
	// A. Setup Variables

	const [isProbeEnded, setProbeEnded] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [isMessageShown, setIsMessageShown] = useState<boolean>(true);

	const [hasParticipatedOnThisStop, setHasParticipatedOnThisStop] = useState<boolean>(false);
	const [stopQuestion1Answer, setQuestion1Answer] = useState<string | undefined>(undefined);
	const [stopQuestion2Answer, setQuestion2Answer] = useState<string | undefined>(undefined);
	const [stopQuestion3Answer, setQuestion3Answer] = useState<string | undefined>(undefined);
	const [stopQuestion4Answer, setQuestion4Answer] = useState<string | undefined>(undefined);

	const [progress, setProgress] = useState<number>(0);

	const t = useTranslations('stops.Probe');

	//
	// B. Fetch Data

	useEffect(() => {
		const ended = localStorage.getItem('Stops|ProbeEnded');
		const currentQuestion = parseInt(localStorage.getItem(`Stops${selectedStop}|ProbeCurrentPage`) || '0');
		const messageShown = localStorage.getItem(`Stops${selectedStop}|EndingMessageShown`) === 'true';
		const stopIdsLocal = localStorage.getItem('Stops|StopIds');
		const answer1 = localStorage.getItem(`Stops${selectedStop}|Question1Answer`);
		const answer2 = localStorage.getItem(`Stops${selectedStop}|Question2Answer`);
		const answer3 = localStorage.getItem(`Stops${selectedStop}|Question3Answer`);
		const answer4 = localStorage.getItem(`Stops${selectedStop}|Question4Answer`);
		const hasParticipatedOnThisStop = stopIdsLocal?.includes(selectedStop);

		if (hasParticipatedOnThisStop) {
			if (ended === 'false' && hasParticipatedOnThisStop) {
				setHasParticipatedOnThisStop(false);
			}
			setCurrentPage(currentQuestion);
			if (ended === 'true' && currentQuestion === 4) {
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
		}
	}, []);

	useEffect(() => {
		const progressPercentage = currentPage / 4 * 100;
		setProgress(progressPercentage);
	}, [currentPage]);

	//
	// C. Handle Actions

	const handleParticipation = () => {
		const currentQuestion = currentPage + 1;
		const participatedOn = localStorage.getItem('Stops|StopIds') || [];

		console.log('You opted in.');
		localStorage.setItem('Stops|ProbeOptIn', 'true');
		localStorage.setItem('Stops|ProbeFirstTime', 'false');
		localStorage.setItem(`Stops${selectedStop}|ProbeEnded`, 'false');
		localStorage.setItem(`Stops${selectedStop}|ProbeCurrentPage`, currentQuestion.toString());
		localStorage.setItem('Stops|StopIds', participatedOn + selectedStop || '');
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
		localStorage.setItem('Stops|ProbeFirstTime', 'false');
		localStorage.setItem(`Stops${selectedStop}|ProbeEnded`, 'true');
		localStorage.setItem(`Stops${selectedStop}|EndingMessageShown`, 'true');
		setProbeEnded(true);
	};

	const handleNextQuestion = () => {
		const nextPage = currentPage + 1;
		if (nextPage === 5) {
			console.log('Probe ended');
			localStorage.setItem(`Stops${selectedStop}|ProbeEnded`, 'true');
			localStorage.setItem(`Stops${selectedStop}|EndingMessageShown`, 'true');
			setProbeEnded(true);
			return;
		}
		setCurrentPage(nextPage);
		localStorage.setItem(`Stops${selectedStop}|ProbeCurrentPage`, nextPage.toString());
	};

	//
	// D. Render Component

	return (
		<>
			{!isProbeEnded && !isMessageShown && !hasParticipatedOnThisStop ? (
				<Surface>
					<Section withGap withPadding>

						{currentPage > 0 && (<Progress className={styles.progressBar} color="green" transitionDuration={800} value={progress} />)}

						{currentPage === 0 && (
							<StopProbeHeader description={description} handleOptOut={handleOptOut} handleParticipation={handleParticipation} title={title} />
						)}

						{currentPage === 1 && (
							<Question1 question1Answer={stopQuestion1Answer || ''} stopId={selectedStop} />
						)}

						{currentPage === 2 && (
							<Question2 question2Answer={stopQuestion2Answer || ''} stopId={selectedStop} />
						)}

						{currentPage === 3 && (
							<Question3 question3Answer={stopQuestion3Answer || ''} stopId={selectedStop} />
						)}

						{currentPage === 4 && (
							<Question4 question4Answer={stopQuestion4Answer || ''} stopId={selectedStop} />
						)}

						{currentPage > 0 && (<div className={styles.submitContainer}><Button onClick={handleNextQuestion}>{t('submit')}</Button></div>)}

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

	//
}
