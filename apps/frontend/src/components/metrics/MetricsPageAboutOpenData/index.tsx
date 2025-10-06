/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';
/* * */

export function MetricsPageAboutOpenData() {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageAboutOpenData');

	//
	// B. Render components

	return (
		<Surface>
			<div id="aboutOpenData">
				<Section heading={t('heading')} withPadding>
					<div className={styles.cardMainWrapperShadow}><span /></div>
					<div className={styles.cardMainWrapper}>
						<p className={styles.cardTitle}>{t('title1')}</p>
						<p className={styles.cardContent} dangerouslySetInnerHTML={{ __html: t.raw('text1') }} />
					</div>
				</Section>
			</div>
		</Surface>
	);

	//
}
