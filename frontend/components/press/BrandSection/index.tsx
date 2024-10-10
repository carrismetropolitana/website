import { Card, CardContent } from '@/components/common/Card';
import { Grid } from '@/components/layout/Grid';
import { BrandsCmet } from '@/settings/assets.settings';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Section } from '../../layout/Section';
import { Surface } from '../../layout/Surface';
import styles from './styles.module.css';

export default function Component() {
	const t = useTranslations('press.Page.brand');

	return (

		<Surface>
			<Section heading={t('heading')} withPadding>
				<Grid className={styles.cards} columns="ab" withGap>
					<p style={{ whiteSpace: 'pre-line' }}>{t.rich('paragraph_1')}</p>
					<Grid columns="a" withGap>
						<Grid columns="ab" withGap>
							<Card>
								<CardContent className={styles.imageContainer}>
									<Image alt="Logo" className={styles.image} height={100} src={BrandsCmet.cmet_light} width={100} />
									<h3>{t('logo')}</h3>
								</CardContent>
							</Card>
							<Card>
								<CardContent className={styles.imageContainer}>
									<Image alt="Logo" className={styles.image} height={100} src={BrandsCmet.cmet_light} width={100} />
									<h3>{t('icons')}</h3>
								</CardContent>
							</Card>
						</Grid>
						<Card>
							<CardContent className={styles.imageContainer}>
								<Image alt="Logo" className={styles.image} height={100} src={BrandsCmet.cmet_light} width={100} />
								<h3>{t('images')}</h3>
							</CardContent>
						</Card>

					</Grid>
				</Grid>
			</Section>
		</Surface>
	);
}
