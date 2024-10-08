/* * */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { IconsCommon, ImagesCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */
export function Pass() {
	//

	//
	// A. Setup variables

	const t = useTranslations('cards.Pass');

	//
	// B. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withPadding>
				<Grid columns="ab" withGap>
					<Card>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Icon Coins" src={IconsCommon.QUESTION} />
								<Image alt="Icon Receipt" src={IconsCommon.TICKET} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>{t('wizard.title')}</CardTitle>
							<CardDescription>{t('wizard.description')}</CardDescription>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Bilhete Navegante Ocasional" src={ImagesCommon.NAVEGANTE_CARD} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>{t('navegante.title')}</CardTitle>
							<CardDescription>{t('navegante.description')}</CardDescription>
						</CardContent>
					</Card>
				</Grid>
			</Section>
		</Surface>
	);

	//
}
