'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import Button from '@/components/common/Button';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { IconBus, IconInfoCircle, IconMedal, IconTrophy, IconUser, IconUsersGroup } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPageIntro() {
	//

	//
	// A. Fetch Data

	const t = useTranslations('metrics.MetricsPageIntro');

	//
	// B. Render components

	return (
		<Surface>
			<Section withBottomDivider withPadding>
				<BackButton href="/" />
			</Section>
			<Section heading={t('heading')} withGap withPadding>
				<p className={styles.text}>{t('text_1')}</p>
				<p className={styles.text}>{t('text_2')}</p>
				<div className={styles.anchorsWrapper}>
					<Button href="#aboutOpenData" icon={<IconInfoCircle size={28} />} label={t('sections.about_open_data')} />
					<Button href="#passengerMetrics" icon={<IconUsersGroup size={28} />} label={t('sections.passengers')} />
					<Button href="#passengerRecords" icon={<IconTrophy size={28} />} label={t('sections.records')} />
					<Button href="#linesMetrics" icon={<IconMedal size={28} />} label={t('sections.lines')} />
					<Button href="#serviceMetrics" icon={<IconBus size={28} />} label={t('sections.service')} />
					<Button href="#contactsMetrics" icon={<IconUser size={28} />} label={t('sections.contacts')} />
				</div>
			</Section>
		</Surface>
	);

	//
}
