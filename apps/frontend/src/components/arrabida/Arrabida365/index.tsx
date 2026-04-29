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

	// G
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
							alt={t('altImageMap')}
							className={styles.imageMap}
							height={1080}
							src="/assets/arrabidas/arrabida_365_map.png"
							width={1920}
						/>
						{/* <div className={styles.imageBeeWrapper}>
							<Link className={styles.learnMore} href="/news/31372">
								{t('buttonSeeMore')}
								<IconArrowRight size={18} />
							</Link>
							<img
								alt={t('altImageBee')}
								className={styles.imageBee}
								height={1080}
								src="https://backoffice.carrismetropolitana.pt/wp-content/uploads/2025/10/arrabida-banner.jpeg"
								width={1920}
							/>
						</div>*/}
						<div className={styles.imageBeeWrapper}>
							<Link className={styles.learnMore} href="https://www.mun-setubal.pt/wp-content/uploads/2026/04/FCS26-PROGRAMA-PTonline.pdf" 
							target="_blank" rel="noopener noreferrer">
								{t('buttonSeeMore')}
								<IconArrowRight size={18} />
							</Link>
							<img
								alt={t('altImageBee')}
								className={styles.imageBee}
								height={1080}
								src="https://staging.carrismetropolitana.pt/admin/api/media/file/media-1777386013015-sta_de_caminhadas_arrabida.jpg"
								width={1920}
							/>
						</div>
					</div>
				</Section>
			</Surface>
		</div>
	);
}
