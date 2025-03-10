/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';
/* * */

export function SurveyAboutCardCriteria() {
	//

	//
	// A. Setup Variables
	const t = useTranslations('survey.SurveyCriteriaCard');
	const rows = [
		{ name: 'firstRow', text: t('firstRowText'), value: t('firstRowValue') },
		{ name: 'secondRow', text: t('secondRowText'), value: t('secondRowValue') },
		{ name: 'thirdRow', text: t('thirdRowText'), value: t('thirdRowValue') },
	];
	//
	// B. Render Components
	return (
		<div>
			<div className={styles.cardMainWrapperShadow}>
				<p className={styles.headerTitle}>{t('header')}</p>
			</div>
			<div className={styles.cardMainWrapper}>
				<div className={styles.cardContent}>
					{rows.map((row, index) => (
						<div key={index} className={styles[`${row.name}`]}>
							<p>{row.value}</p>
							<p>{row.text}</p>
						</div>
					))}
					<p className={styles.fourthRowText}>{t('fourthRowText')}</p>
				</div>
			</div>
		</div>

	);
	//
}
