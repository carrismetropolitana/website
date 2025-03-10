'use client';
/* * */
import { LottiePlayer } from '@/components/common/LottiePlayer';
import { SurveryAboutCardSchema } from '@/components/survey/_data/About/cards';
import { useState } from 'react';

import styles from './styles.module.css';
/* * */
interface Props {
	cardData: SurveryAboutCardSchema

}
/* * */
export function SurveyAboutCard({ cardData }: Props) {
	//

	//
	// A. Setup Variables
	const [isStopped, setIsStopped] = useState <boolean | false > (false);
	//
	// B. Render Components

	return (
		<div className={styles.container}>
			<div className={styles.cardMainWrapperShadow}>
				<p className={styles.headerTitle}>{cardData.content.header_title}</p>
			</div>
			<div className={styles.cardMainWrapper} id={cardData._id}>
				<div className={styles.header}>
					{cardData.content.lottie_src && (
						<LottiePlayer
							className={styles.lottie}
							loop={false}
							onAnimationEnd={() => setIsStopped(true)}
							path={cardData.content.lottie_src}
							play={!isStopped}
						/>
					)}
					<p className={styles.intro}>{cardData.content.intro || ''}</p>
					<p className={styles.headerNumber}>{cardData.header.value}</p>
					<p className={styles.contentLegend}>{cardData.content.legend}</p>
				</div>
			</div>
		</div>
	);

	//
}
