import { Card, CardContent } from '@/components/common/Card';
import { Grid } from '@/components/layout/Grid';
import { Link } from '@/i18n/routing';
import { BrandsCmet, Files, IconsCommon } from '@/settings/assets.settings';
import { Routes } from '@/utils/routes';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Section } from '../../layout/Section';
import { Surface } from '../../layout/Surface';
import styles from './styles.module.css';

export default function Component() {
	const t = useTranslations('press.Page.brand');

	return (

		<Surface variant="brand">
			<Section heading={t('heading')} variant="brand" withPadding>
				<Grid className={styles.cards} columns="a" withGap>
					<p className={styles.paragraph}>{t.rich('paragraph_1')}</p>
					<Grid columns="a" withGap>
						<Grid columns="abc" withGap>
							<Link href={Files.LOGO_CMET_ZIP}>
								<Card className={styles.card}>
									<CardContent className={styles.imageContainer}>
										<Image alt="Logo" className={(styles.image)} height={80} src={BrandsCmet.cmet_light} width={80} />
										<h3>{t('logo')}</h3>
									</CardContent>
								</Card>
							</Link>
							<Link href={Files.ICONS_CMET_ZIP}>
								<Card className={styles.card}>
									<CardContent className={styles.imageContainer}>
										<Image alt="Logo" className={styles.image} height={80} src={IconsCommon.BUS} width={80} />
										<h3>{t('icons')}</h3>
									</CardContent>
								</Card>
							</Link>
							<Link href={Routes.PRESS_IMAGE_BANK.route}>
								<Card className={styles.card}>
									<CardContent className={styles.imageContainer}>
										<Image alt="Logo" className={styles.image} height={80} src={IconsCommon.MOUNTAIN} width={80} />
										<h3>{t('images')}</h3>
									</CardContent>
								</Card>
							</Link>
						</Grid>

					</Grid>
				</Grid>
			</Section>
		</Surface>
	);
}
