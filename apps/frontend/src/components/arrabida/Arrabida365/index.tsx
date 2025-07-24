/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Button } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function Arrabida365() {
	//

	//
	// A. Setup variables

	const t = useTranslations('arrabida.ArrabidaPage.sections.Arrabida365');

	//
	// B. Transform data

	//
	// C. Render components

	return (
		<div id="arrabida365">
			<Surface forceOverflow>
				<div className={styles.backButton}>
					<Link className={styles.container} href="/">
						<IconArrowLeft size={14} />
						<span className={styles.label}>Carris Metropolitana</span>
					</Link>
				</div>
				<Section heading={t('title')} withGap withPadding>
					<h6 className={styles.subheading}>{t('subtitle')}</h6>
					<div className={styles.imagesWrapper}>
						<Image alt="Arrabida 365" className={styles.imageMap} height={1080} src="/assets/arrabidas/arrabida_365_map.png" width={1920} />
						<div className={styles.imageBeeWrapper}>
							<Image alt="Arrabida 365" className={styles.imageBee} height={1080} src="/assets/arrabidas/arrabida_365.png" width={1920} />
							<Button className={styles.buttonSeeMore} rightSection={<IconArrowRight size={18} />}>{t('buttonSeeMore')}</Button>
						</div>
					</div>

				</Section>
			</Surface>
		</div>
	);

	//
}
