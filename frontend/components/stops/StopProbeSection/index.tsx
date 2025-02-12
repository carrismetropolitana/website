import { LottiePlayer } from '@/components/common/LottiePlayer';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Button, Progress, Radio } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

interface Props {
	description?: string
	title: string
}

export function StopProbeSection({ description, title }: Props) {
	//

	//
	// A. Setup Variables

	const [isProbeEnded, setProbeEnded] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [isMessageShown, setIsMessageShown] = useState<boolean>(true);

	const [stopQuestion1Answer, setQuestion1Answer] = useState<string | undefined>(undefined);
	const [stopQuestion2Answer, setQuestion2Answer] = useState<string | undefined>(undefined);
	const [stopQuestion3Answer, setQuestion3Answer] = useState<string | undefined>(undefined);
	const [stopQuestion4Answer, setQuestion4Answer] = useState<string | undefined>(undefined);

	const [progress, setProgress] = useState<number>(0);

	const t = useTranslations('stops.Probe');

	//
	// B. Fetch Data

	useEffect(() => {
		const ended = localStorage.getItem('Stops|ProbeEnded') === 'true';
		const currentQuestion = parseInt(localStorage.getItem('Stops|ProbeCurrentPage') || '0');
		const messageShown = localStorage.getItem('Stops|EndingMessageShown') === 'true';
		const answer1 = localStorage.getItem('Stops|Question1Answer');
		const answer2 = localStorage.getItem('Stops|Question2Answer');
		const answer3 = localStorage.getItem('Stops|Question3Answer');
		const answer4 = localStorage.getItem('Stops|Question4Answer');

		console.log(answer1, answer2, answer3, answer4);

		setCurrentPage(currentQuestion);
		setProbeEnded(ended);
		setIsMessageShown(messageShown);
		setQuestion1Answer(answer1 || undefined);
		setQuestion2Answer(answer2 || undefined);
		setQuestion3Answer(answer3 || undefined);
		setQuestion4Answer(answer4 || undefined);
	}, []);

	useEffect(() => {
		const progressPercentage = currentPage / 4 * 100;
		setProgress(progressPercentage);
	}, [currentPage]);

	//
	// C. Handle Actions

	const handleParticipation = () => {
		const currentQuestion = currentPage + 1;

		console.log('You opted in.');
		localStorage.setItem('Stops|ProbeOptIn', 'true');
		localStorage.setItem('Stops|ProbeFirstTime', 'false');
		localStorage.setItem('Stops|ProbeEnded', 'false');
		localStorage.setItem('Stops|ProbeCurrentPage', currentQuestion.toString());

		setCurrentPage(currentQuestion);
		setProbeEnded(false);
	};
	const handleOptOut = () => {
		console.log('You opted out.');
		localStorage.setItem('Stops|ProbeOptIn', 'false');
		localStorage.setItem('Stops|ProbeFirstTime', 'false');
		localStorage.setItem('Stops|ProbeEnded', 'true');
		localStorage.setItem('Stops|EndingMessageShown', 'true');

		setProbeEnded(true);
	};

	const handleNextQuestion = () => {
		const nextPage = currentPage + 1;

		if (nextPage === 5) {
			console.log('Probe ended');
			localStorage.setItem('Stops|ProbeEnded', 'true');
			localStorage.setItem('Stops|EndingMessageShown', 'true');
			setProbeEnded(true);

			return;
		}

		setCurrentPage(nextPage);
		localStorage.setItem('Stops|ProbeCurrentPage', nextPage.toString());
	};

	const handleQuestion1 = (e: React.MouseEvent<HTMLButtonElement>) => {
		const value = e.currentTarget.value;
		localStorage.setItem('Stops|Question1Answer', value);
		setQuestion1Answer(value);
	};
	const handleQuestion2 = (e: React.MouseEvent<HTMLButtonElement>) => {
		const value = e.currentTarget.value;
		localStorage.setItem('Stops|Question2Answer', value);
		setQuestion2Answer(value);
	};
	const handleQuestion3 = (e) => {
		const value = e;
		localStorage.setItem('Stops|Question3Answer', value);
		setQuestion3Answer(value);
	};
	const handleQuestion4 = (e) => {
		const value = e;
		localStorage.setItem('Stops|Question4Answer', value);
		setQuestion4Answer(value);
	};

	//
	// D. Render Component

	return (
		<>
			{!isProbeEnded && !isMessageShown ? (
				<Surface>
					<Section withGap withPadding>
						{currentPage > 0 && (<Progress className={styles.progressBar} color="green" transitionDuration={800} value={progress} />)}
						{currentPage === 0 && (
							<div className={styles.probeHeaderContainer}>
								<div className={styles.probeHeaderDetails}>
									<p className={styles.probeTitle}>{title}</p>
									<p className={styles.probeDescription}>{description}</p>
								</div>
								<div className={styles.actionButton}>
									<Button onClick={handleParticipation}>{t('optin')}</Button>
									<Button onClick={handleOptOut}>{t('optout')}</Button>
								</div>
							</div>
						)}
						{currentPage === 1 && (
							<div className={styles.fullWidth}>
								<p className={styles.probeTitle}>{t('stop|probe|question1')}</p>
								<div className={styles.possibleAnswersContainer}>
									<Button
										className={stopQuestion1Answer === 'sad' ? styles.selected : ''}
										onClick={e => handleQuestion1(e)}
										value="sad"
									>
										<LottiePlayer
											path="/assets/probe/sad.json"
											style={{ height: 70, width: 70 }}
											loop
											play
										/>
									</Button>
									<Button
										className={stopQuestion1Answer === 'unsure' ? styles.selected : ''}
										onClick={e => handleQuestion1(e)}
										value="unsure"
									>
										<LottiePlayer
											path="/assets/probe/unsure.json"
											style={{ height: 70, width: 70 }}
											loop
											play
										/>
									</Button>
									<Button
										className={stopQuestion1Answer === 'happy' ? styles.selected : ''}
										onClick={e => handleQuestion1(e)}
										value="happy"
									>
										<LottiePlayer
											path="/assets/probe/happy.json"
											style={{ height: 70, width: 70 }}
											loop
											play
										/>
									</Button>
									<Button
										className={stopQuestion1Answer === 'loving' ? styles.selected : ''}
										onClick={e => handleQuestion1(e)}
										value="loving"
									>
										<LottiePlayer
											path="/assets/probe/loving.json"
											style={{ height: 70, width: 70 }}
											loop
											play
										/>
									</Button>
								</div>
							</div>
						)}
						{currentPage === 2 && (
							<div className={styles.fullWidth}>
								<p className={styles.probeTitle}>{t('stop|probe|question2')}</p>
								<div className={styles.possibleAnswersContainer}>
									<Button className={stopQuestion2Answer === 'yes' ? styles.selected : ''} onClick={e => handleQuestion2(e)} value="yes">{t('stop|probe|q2|answer1')}</Button>
									<Button className={stopQuestion2Answer === 'no' ? styles.selected : ''} onClick={e => handleQuestion2(e)} value="no">{t('stop|probe|q2|answer2')}</Button>
								</div>
							</div>
						)}
						{currentPage === 3 && (
							<div className={styles.fullWidth}>
								<p className={styles.probeTitle}>{t('stop|probe|question3')}</p>
								<Radio.Group onChange={e => handleQuestion3(e)}>
									<div className={styles.possibleAnswersContainer}>
										<Radio checked={stopQuestion3Answer === '1'} label={t('stop|probe|q3|answer1')} value="1" />
										<Radio checked={stopQuestion3Answer === '2'} label={t('stop|probe|q3|answer2')} value="2" />
										<Radio checked={stopQuestion3Answer === '3'} label={t('stop|probe|q3|answer3')} value="3" />
										<Radio checked={stopQuestion3Answer === '4'} label={t('stop|probe|q3|answer4')} value="4" />
										<Radio checked={stopQuestion3Answer === '5'} label={t('stop|probe|q3|answer5')} value="5" />
									</div>
								</Radio.Group>
							</div>
						)}
						{currentPage === 4 && (
							<div className={styles.fullWidth}>
								<p className={styles.probeTitle}>{t('stop|probe|question4')}</p>
								<Radio.Group onChange={e => handleQuestion4(e)} value={stopQuestion4Answer}>
									<div className={styles.possibleAnswersContainer}>
										<Radio checked={stopQuestion4Answer === '1'} label={t('stop|probe|q4|answer1')} value="1" />
										<Radio checked={stopQuestion4Answer === '2'} label={t('stop|probe|q4|answer2')} value="2" />
										<Radio checked={stopQuestion4Answer === '3'} label={t('stop|probe|q4|answer3')} value="3" />
										<Radio checked={stopQuestion4Answer === '4'} label={t('stop|probe|q4|answer4')} value="4" />
										<Radio checked={stopQuestion4Answer === '5'} label={t('stop|probe|q4|answer5')} value="5" />
									</div>
								</Radio.Group>

							</div>
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
