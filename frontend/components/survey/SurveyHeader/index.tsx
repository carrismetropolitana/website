import Button from '@/components/common/Button';
import { LottiePlayer } from '@/components/common/LottiePlayer';
import { GridNav } from '@/components/layout/GridNav';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Text } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

export function SurveyHeader() {
	//

	//
	// A. Setup Variables

	const t = useTranslations('survey.SurveyHeader');
	const anchorButtons = [
		{ _id: '0', href: '#aboutSurvey', label: `${t('AnchorAboutSurvey')}` },
		{ _id: '1', href: '#passangerChacterization', label: `${t('AnchorPassengerCaracter')}` },
		{ _id: '2', href: '#recomendationIndex', label: `${t('AnchorIndex')}` },
		{ _id: '3', href: '#results', label: `${t('AnchorResults')}` },
	];

	//
	// B. Render Components
	const renderAnchorButtons = () => (
		<GridNav className={styles.gridNav} items={anchorButtons} />
	);

	const renderDownloadButton = () => (
		<div className={styles.downloadButtonContainer}>
			<Button className={styles.downloadButton} href="/assets/survey/CM _ Resultados Inquérito.pdf" icon={<IconDownload size={20} />} label={t('DownloadButton')} target="_blank" />
		</div>
	);

	const renderHeaderContent = () => (
		<div className={styles.cardContainer}>
			<div className={styles.globalSatisfactionText}>
				<Text>{t('heading')}</Text>

			</div>
			<LottiePlayer
				className={styles.lottieGlobalSatisfaction}
				loop={false}
				path="assets/survey/animations/sobre/ISGP.json"
				play
			/>
			<div className={styles.header}>
				<div className={styles.leftColumn}>
					<div className={styles.squircle}>
						<div className={styles.circledNumber}>
							<div className={styles.blurredCircle} />
							<Text className={styles.headerNumber}>{t('value')}</Text>
						</div>
					</div>
				</div>
				<div className={styles.rightColumn}>
					<Text className={styles.headerTitle}>{t('legend')}</Text>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<Surface>
				<Section heading={t('title')} subheading={t('subtitle')}>
					{renderAnchorButtons()}
					{renderDownloadButton()}
				</Section>
			</Surface>
			<Surface>
				<Section>
					{renderHeaderContent()}
				</Section>
			</Surface>
		</>
	);
	//
}
