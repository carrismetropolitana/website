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

export function TicketsHeader() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tickets.TicketsHeader');

	//
	// B. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withPadding>
				<Grid columns="ab" withGap>
					<Card>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Icon Coins" src={IconsCommon.RECEIPT} />
								<Image alt="Icon Receipt" src={IconsCommon.RECEIPT} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>{t('onboard.title')}</CardTitle>
							<CardDescription>{t('onboard.description')}</CardDescription>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Bilhete Navegante Ocasional" src={ImagesCommon.NAVEGANTE_OCCASIONAL} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>{t('prepaid.title')}</CardTitle>
							<CardDescription>{t('prepaid.description')}</CardDescription>
						</CardContent>
					</Card>
				</Grid>
			</Section>
		</Surface>
	);

	//
}
