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

export function StopInquirySection({ description, title }: Props) {
	//

	//
	// A. Setup Variables
	const [isInquiryEnded, setInquiryEnded] = useState<boolean>(false);
	const [isParticipating, setParticipatingStatus] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [stopQuestion1Answer, setQuesion1Answer] = useState<string | undefined>(undefined);
	const [stopQuestion2Answer, setQuesion2Answer] = useState<string | undefined>(undefined);
	const [stopQuestion3Answer, setQuesion3Answer] = useState<string | undefined>(undefined);
	const [stopQuestion4Answer, setQuesion4Answer] = useState<string | undefined>(undefined);
	const [progress, setProgress] = useState<number>(0);

	const t = useTranslations('stops.Inquiry');
	//
	// B. Fetch Data
	useEffect(() => {
		const ended = localStorage.getItem('Stops|InquiryEnded');
		const participates = localStorage.getItem('Stops|InquiryOptIn');
		const currentQuestion = localStorage.getItem('Stops|InquiryCurrentPage');

		setCurrentPage(currentQuestion ? parseInt(currentQuestion) : 0);
		if (ended !== null) {
			setInquiryEnded(ended === 'true');
		}
		else {
			setInquiryEnded(false);
		}
		setParticipatingStatus(participates === 'true');
		if (participates === null) {
			setParticipatingStatus(true);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (isInquiryEnded) {
			setIsVisible(true);
		}
		else if (!isParticipating) {
			setIsVisible(true);
			const timer = setTimeout(() => {
				setIsVisible(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isInquiryEnded, isParticipating]);

	useEffect(() => {
		const progressPercentage = currentPage / 4 * 100;
		setProgress(progressPercentage);
	}, [currentPage]);
	//
	// C. Handle Actions

	const handleParticipation = () => {
		const currentQuestion = currentPage + 1;

		console.log('You opted in.');
		localStorage.setItem('Stops|InquiryOptIn', 'true');
		localStorage.setItem('Stops|InquiryFirstTime', 'false');
		localStorage.setItem('Stops|InquiryEnded', 'false');
		localStorage.setItem('Stops|InquiryCurrentPage', currentQuestion.toString());

		setCurrentPage(currentQuestion);
		setParticipatingStatus(true);
		setInquiryEnded(false);
	};
	const handleOptOut = () => {
		console.log('You opted out.');
		localStorage.setItem('Stops|InquiryOptIn', 'false');
		localStorage.setItem('Stops|InquiryFirstTime', 'false');
		localStorage.setItem('Stops|InquiryEnded', 'true');

		setParticipatingStatus(false);
		setInquiryEnded(true);
		setIsVisible(false);
	};

	const handleNextQuestion = () => {
		const nextPage = currentPage + 1;

		if (nextPage === 5) {
			console.log('Inquiry ended');
			localStorage.setItem('Stops|InquiryEnded', 'true');
			setInquiryEnded(true);
			setIsVisible(true);
			return;
		}

		setCurrentPage(nextPage);
		localStorage.setItem('Stops|InquiryCurrentPage', nextPage.toString());
	};

	const handleQuestion1 = (e) => {
		const value = e.target.value;
		console.log('1: ', value);
		setQuesion1Answer(value);
	};
	const handleQuestion2 = (e) => {
		const value = e.target.value;
		console.log('2: ', value);
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
			{!isParticipating && isVisible && !isLoading && isInquiryEnded ? (
				<Surface>
					<Section>
						<div className={styles.fadeOut}>
							<p>{t('endingMessage')}</p>
						</div>
					</Section>
				</Surface>
			) : (
				<Surface>
					<Section withGap withPadding>
						{currentPage > 0 && (<Progress className={styles.progressBar} color="green" transitionDuration={800} value={progress} />)}
						{currentPage === 0 && (
							<>
								<p className={styles.inquiryTitle}>{title}</p>
								<p className={styles.inquiryDescription}>{description}</p>
								<div className={styles.actionButton}>
									<Button onClick={handleParticipation}>{t('optin')}</Button>
									<Button onClick={handleOptOut}>{t('optout')}</Button>
								</div>
							</>
						)}
						{currentPage === 1 && (
							<div>
								<p className={styles.inquiryTitle}>{t('Stop|Inquiry|Question1')}</p>
								<div className={styles.possibleAnswersContainer}>
									<Button onClick={e => handleQuestion1(e)} value="1"> <IconMoodAngry size={40} /> </Button>
									<Button onClick={e => handleQuestion1(e)} value="2"> <IconMoodSad size={40} /> </Button>
									<Button onClick={e => handleQuestion1(e)} value="3"> <IconMoodSmileBeam size={40} /> </Button>
									<Button onClick={e => handleQuestion1(e)} value="4"> <IconMoodHappy size={40} /> </Button>
								</div>
							</div>
						)}
						{currentPage === 2 && (
							<div>
								<p className={styles.inquiryTitle}>{t('Stop|Inquiry|Question2')}</p>
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
								<p className={styles.inquiryTitle}>{t('Stop|Inquiry|Question3')}</p>
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
								<p className={styles.inquiryTitle}>{t('Stop|Inquiry|Question4')}</p>
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

			)}
		</>
	);
	//
}
