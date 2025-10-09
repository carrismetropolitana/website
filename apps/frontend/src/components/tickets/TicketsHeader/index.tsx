/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Image } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
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
		<Surface variant="brand2">
			<Section heading={t('heading')} subheading={t('subheading')} withPadding>
				<Grid columns="ab" withGap>

					<div className={styles.cardWrapper}>
						<Image alt={t('onboard.title')} className={styles.cardImage} src="/assets/tickets/images/onboard.svg" />
						<div className={styles.cardContents}>
							<p className={styles.cardTitle}>{t('onboard.title')}</p>
							<p className={styles.cardDescription}>{t('onboard.description')}</p>
						</div>
						<a className={styles.innerCardWrapper} href="https://tap-and-ride.carrismetropolitana.pt" rel="noreferrer" target="_blank">
							<Image alt={t('onboard.inner.title')} className={styles.cardImage} src="/assets/tickets/images/tap-and-ride.svg" />
							<div className={styles.cardContents}>
								<p className={styles.cardTitle}>{t('onboard.inner.title')}</p>
								<p className={styles.cardDescription}>{t('onboard.inner.description')}</p>
							</div>
							<IconArrowRight className={styles.innerCardIcon} />
						</a>
					</div>

					<div className={styles.cardWrapper}>
						<Image alt={t('prepaid.title')} className={styles.cardImage} src="/assets/tickets/images/prepaid.svg" />
						<div className={styles.cardContents}>
							<p className={styles.cardTitle}>{t('prepaid.title')}</p>
							<p className={styles.cardDescription}>{t('prepaid.description')}</p>
						</div>
					</div>

				</Grid>
			</Section>
		</Surface>
	);

	//
}
