/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import { ArrabidaIcon } from '../ArrabidaHeader/ArrabidaIcon';
import { ArrabidaLogo } from '../ArrabidaHeader/ArrabidaLogo';
import { CarrisLogo } from './CarrisLogo';
import { SetubalLogo } from './SetubalLogo';

/* * */

export function ArrabidaAbout() {
	//

	//
	// A. Setup variables

	const t = useTranslations('arrabida.ArrabidaPage.sections.ArrabidaAbout');

	//
	// B. Transform data

	//
	// C. Render components

	return (
		<div id="about">
			<Surface>
				<Section heading={t('title')} withGap withPadding>
					<div className={styles.container}>
						<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className={styles.video} frameBorder="0" referrerPolicy="strict-origin-when-cross-origin" src="https://www.youtube.com/embed/O4r8uZ_QJjg" title="YouTube video player" allowFullScreen />
						<div className={styles.textContainer}>
							<div className={styles.textWrapper}>
								<Text className={styles.text}>
									<span className={styles.textBold}>{t('text-1')}</span>{' '}
									{t('text-2')}{' '}
									<span className={styles.textBold}>{t('text-3')}</span>
								</Text>{' '}
								<Text className={styles.text}>{t('text-4')}</Text>
							</div>

							<div className={styles.logos}>
								<div aria-label="Logotipo do projeto arrábida 365" className={styles.logoWrapper}>
									<ArrabidaIcon />
									<ArrabidaLogo />
								</div>
								<a href="/" rel="noopener noreferrer" style={{ cursor: 'pointer' }} target="_blank">
									<CarrisLogo />
								</a>
								<SetubalLogo />
							</div>

						</div>
					</div>

				</Section>
			</Surface>
		</div>
	);

	//
}
