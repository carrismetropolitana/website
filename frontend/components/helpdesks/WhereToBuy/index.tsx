/* * */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { ImagesCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function WhereToBuy() {
	//

	//
	// A. Setup variables

	const t = useTranslations('helpdesks.WhereToBuy');

	//
	// B. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withPadding>
				<Grid columns="ab" withGap>
					<Card>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Navegante Ocasional" src={ImagesCommon.NAVEGANTE_OCCASIONAL} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>{t('ocasional_travel.title')}</CardTitle>
							<CardDescription>{t('ocasional_travel.description')}</CardDescription>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Passe Navegante" src={ImagesCommon.NAVEGANTE_CARD} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>{t('frequent_travel.title')}</CardTitle>
							<CardDescription>{t('frequent_travel.description')}</CardDescription>
						</CardContent>
					</Card>
				</Grid>
			</Section>
		</Surface>
	);

	//
}
