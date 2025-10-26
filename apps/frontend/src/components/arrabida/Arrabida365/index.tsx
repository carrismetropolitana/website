/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
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
						<Image
							alt="Imagem ilustrativa do projeto da Arrábida 365."
							className={styles.imageMap}
							height={1080}
							src="/assets/arrabidas/arrabida_365_map.png"
							width={1920}
						/>
						<div className={styles.imageBeeWrapper}>
							<Link className={styles.learnMore} href="/news/31372">
								{t('buttonSeeMore')}
								<IconArrowRight size={18} />
							</Link>
							<Image
								alt="Notícia em destaque “Setúbal, Arrábida: O Início da Época Balnear”"
								className={styles.imageBee}
								height={1080}
								src="https://backoffice.carrismetropolitana.pt/wp-content/uploads/2025/10/arrabida-banner.jpeg"
								width={1920}
							/>
						</div>
					</div>
				</Section>
			</Surface>
		</div>
	);
}
