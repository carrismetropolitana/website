'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Review2024CardGroup } from '@/components/review-2024/Review2024CardGroup';
import { URLS } from '@/settings/urls.settings';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function Review2024LevelFour() {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024LevelFour');

	//
	// B. Render components

	return (
		<Surface forceOverflow>
			<Grid columns="abb">

				<Section withPadding="desktop" withGap>
					<div className={styles.headingWrapper}>
						<h2 className={styles.heading}>{t('digital.heading')}</h2>
						<h5 className={styles.subheading}>{t('digital.subheading')}</h5>
					</div>
					<Review2024CardGroup groupId="digital" />
				</Section>

				<Section withPadding="desktop" withGap>
					<div className={styles.linksGrid}>
						<Link href={URLS.socials.instagram} target="_blank">
							<Image className={styles.linksGridImage} src="/assets/review-2024/images/socials-instagram.svg" w="100%" />
						</Link>
						<Link href={URLS.socials.whatsapp} target="_blank">
							<Image className={styles.linksGridImage} src="/assets/review-2024/images/socials-whatsapp.svg" w="100%" />
						</Link>
						<Link href="/app" target="_blank">
							<Image className={styles.linksGridImage} src="/assets/review-2024/images/socials-app.svg" w="100%" />
						</Link>
						<Link href={URLS.socials.x} target="_blank">
							<Image className={styles.linksGridImage} src="/assets/review-2024/images/socials-twitter.svg" w="100%" />
						</Link>
					</div>
				</Section>

			</Grid>
		</Surface>
	);

	//
}
