'use client';

/* * */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { ThemeDark, ThemeLight } from '@/components/responsive/ThemeSwitch';
import { IconsCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Service() {
	//

	//
	// A. Setup variables

	const t = useTranslations('cards.Service');

	//
	// B. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withPadding>
				<Grid columns="ab" withGap>
					<Card className={styles.card}>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Navegante Ocasional" src={IconsCommon.NAVEGANTE_POINT} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>{t('stores.title')}</CardTitle>
							<CardDescription>{t('stores.description')}</CardDescription>
						</CardContent>
					</Card>
					<Card className={styles.card}>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Passe Navegante" src={IconsCommon.NAVEGANTE_APP} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>{t('app.title')}</CardTitle>
							<CardDescription>{t('app.description')}</CardDescription>
						</CardContent>
					</Card>
					<Card className={styles.cardAlt}>
						<CardHeader>
							<div className={styles.images}>
								<ThemeLight>
									<Image alt="Navegante Ocasional" src={IconsCommon.MULTIBANCO_DARK} />
								</ThemeLight>
								<ThemeDark>
									<Image alt="Navegante Ocasional" src={IconsCommon.MULTIBANCO_LIGHT} />
								</ThemeDark>
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>{t('multibanco.title')}</CardTitle>
							<CardDescription>{t('multibanco.description')}</CardDescription>
						</CardContent>
					</Card>
					<Card className={styles.cardAlt}>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Passe Navegante" src={IconsCommon.PAYSHOP} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>{t('payshop.title')}</CardTitle>
							<CardDescription>{t('payshop.description')}</CardDescription>
						</CardContent>
					</Card>
				</Grid>
			</Section>
		</Surface>
	);

	//
}
