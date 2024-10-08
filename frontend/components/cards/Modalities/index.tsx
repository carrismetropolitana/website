/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { IconsCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Modalities() {
	//

	//
	// A. Setup variables

	const t = useTranslations('cards.Modalities');

	//
	// B. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withPadding>
				<Grid columns="ab" withGap>
					<div className={styles.card}>
						<div className={styles.images}>
							<Image alt="AML Map" src={IconsCommon.AML_MAP} />
						</div>
						<div className={styles.cardContent}>
							<h3>{t('metropolitano.price')}</h3>
							<h2>{t('metropolitano.title')}</h2>
							<p>{t('metropolitano.description')}</p>
						</div>
					</div>
					<div className={styles.card}>
						<div className={styles.images}>
							<Image alt="AML Map Single" src={IconsCommon.AML_MAP_SINGLE} />
						</div>
						<div className={styles.cardContent}>
							<h3>{t('municipal.price')}</h3>
							<h2>{t('municipal.title')}</h2>
							<p>{t('municipal.description')}</p>
						</div>
					</div>
				</Grid>
			</Section>
		</Surface>
	);

	//
}
