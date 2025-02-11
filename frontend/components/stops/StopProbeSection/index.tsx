import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Button, Progress, Radio } from '@mantine/core';
import { IconMoodAngry, IconMoodHappy, IconMoodSad, IconMoodSmileBeam } from '@tabler/icons-react';
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

	const [stopQuestion1Answer, setQuesion1Answer] = useState<string | undefined>(undefined);
	const [stopQuestion2Answer, setQuesion2Answer] = useState<string | undefined>(undefined);
	const [stopQuestion3Answer, setQuesion3Answer] = useState<string | undefined>(undefined);
	const [stopQuestion4Answer, setQuesion4Answer] = useState<string | undefined>(undefined);

	const [progress, setProgress] = useState<number>(0);

	const t = useTranslations('stops.Probe');

	//
	// B. Fetch Data

	useEffect(() => {
		const ended = localStorage.getItem('Stops|ProbeEnded') === 'true';
		const currentQuestion = parseInt(localStorage.getItem('Stops|ProbeCurrentPage') || '0');
		const messageShown = localStorage.getItem('Stops|EndingMessageShown') === 'true';

		setCurrentPage(currentQuestion);
		setProbeEnded(ended);
		setIsMessageShown(messageShown);
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

	const handleQuestion1 = (e) => {
		const value = e.target.id;
		console.log('1: ', value);
		setQuesion1Answer(value);
	};
	const handleQuestion2 = (e) => {
		const value = e.target;
		console.log('2: ', stopQuestion2Answer);
		setQuesion2Answer(value);
	};
	const handleQuestion3 = (e) => {
		const value = e.target.value;
		console.log('3: ', value);
		setQuesion3Answer(value);
	};
	const handleQuestion4 = (e) => {
		const value = e.target.value;
		console.log('4: ', value);
		setQuesion4Answer(value);
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
							<div>
								<p className={styles.probeTitle}>{title}</p>
								<p className={styles.probeDescription}>{description}</p>
								<div className={styles.actionButton}>
									<Button onClick={handleParticipation}>{t('optin')}</Button>
									<Button onClick={handleOptOut}>{t('optout')}</Button>
								</div>
							</div>
						)}
						{currentPage === 1 && (
							<div>
								<p className={styles.probeTitle}>{t('stop|probe|question1')}</p>
								<div className={styles.possibleAnswersContainer}>
									<Button className={styles.questionButton} id="question1" onClick={e => handleQuestion1(e)} value="1"> <IconMoodAngry size={40} /> </Button>
									<Button className={styles.questionButton} id="question2" onClick={e => handleQuestion1(e)} value="2"> <IconMoodSad size={40} /> </Button>
									<Button className={styles.questionButton} id="question3" onClick={e => handleQuestion1(e)} value="3"> <IconMoodSmileBeam size={40} /> </Button>
									<Button className={styles.questionButton} id="question4" onClick={e => handleQuestion1(e)} value="4"> <IconMoodHappy size={40} /> </Button>
								</div>
							</div>
						)}
						{currentPage === 2 && (
							<div>
								<p className={styles.probeTitle}>{t('stop|probe|question2')}</p>
								<Radio.Group onChange={handleQuestion2} value={stopQuestion2Answer}>
									<div className={styles.possibleAnswersContainer}>
										<Radio label="Opção 1" value="1" />
										<Radio label="Opção 2" value="2" />
										<Radio label="Opção 3" value="3" />
										<Radio label="Opção 4" value="4" />
									</div>
								</Radio.Group>
							</div>
						)}
						{currentPage === 3 && (
							<div>
								<p className={styles.probeTitle}>{t('stop|probe|question3')}</p>
								<Radio.Group onChange={handleQuestion3} value={stopQuestion3Answer}>
									<div className={styles.possibleAnswersContainer}>
										<Radio label="Opção 1" value="1" />
										<Radio label="Opção 2" value="2" />
										<Radio label="Opção 3" value="3" />
										<Radio label="Opção 4" value="4" />
									</div>
								</Radio.Group>
							</div>
						)}
						{currentPage === 4 && (
							<div>
								<p className={styles.probeTitle}>{t('stop|probe|question4')}</p>
								<Radio.Group onChange={handleQuestion4} value={stopQuestion4Answer}>
									<div className={styles.possibleAnswersContainer}>
										<Radio label="Opção 1" value="1" />
										<Radio label="Opção 2" value="2" />
										<Radio label="Opção 3" value="3" />
										<Radio label="Opção 4" value="4" />
									</div>
								</Radio.Group>

							</div>
						)}
						{currentPage > 0 && (<Button onClick={handleNextQuestion}>{t('submit')}</Button>)}
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
