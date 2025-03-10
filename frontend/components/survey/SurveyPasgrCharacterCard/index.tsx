'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { SurveyPassengersCardSchema } from '@/components/survey/_data/Passenger/cards';

import styles from './styles.module.css';

/* * */

interface Props {
	cardData: SurveyPassengersCardSchema
}
/* * */

export function SurveyPasgrCharacterCard({ cardData }: Props) {
	//

	//
	// A. Render components
	return (
		<div className={styles.container} id={cardData._id}>
			{cardData.content.lottie_src && (
				<div className={styles.contentLottie}>
					<p className={styles.headerTitle}>{cardData.header.title}</p>
					<LottiePlayer path={cardData.content.lottie_src} loop play />
				</div>
			)}
		</div>
	);
	//
}
