'use client';

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function SurveySealOfApproval() {
	//

	//
	// A. Setup variables
	const t = useTranslations('survey.SurveyRecomendationIndex');

	//
	// B. Render components
	return (
		<div id="recomendationIndex">
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.leftColumn}>
						<div className={styles.squircle}>
							<div className={styles.circledNumber}>
								<div className={styles.blurredCircle} />
								<p className={styles.headerNumber}>{t('card_value')}</p>
							</div>
						</div>
					</div>
					<div className={styles.rightColumn}>
						<p className={styles.headerTitle}>{t('card_heading')}</p>
					</div>
				</div>
				<div className={styles.sealOfApprovalText}>
					<p>{t('card_legend')}</p>
				</div>
			</div>
		</div>
	);
	//
}
