/* * */

import LayoutSection from '@/components/layout/Section';
import LostAndFoundOperatorSection from '@/components/lost-and-found/OperatorSection';
import { Image } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import styles from './styles.module.css';

/* * */

export default async function Component() {
	//

	//
	// A. Setup variables

	const t = await getTranslations('lost-and-found.Page');

	//
	// B. Render components

	return (
		<>
			<LayoutSection heading={t('heading')} subheading={t('subheading')} withTopBorder={false} withChildrenPadding>
				<Image alt="AML Map" className={styles.map} fallbackSrc="/news/placeholder.png" src="/images/aml-map.png" />
			</LayoutSection>
			<LostAndFoundOperatorSection actions={[{ href: 'mailto:passageiro@viacaoalvorada.pt', type: 'email' }]} description={t('operator_sections.41.description')} title={t('operator_sections.41.title')} />
			<LostAndFoundOperatorSection actions={[{ href: 'https://www.rodoviariadelisboa.pt/perdidoAchado', type: 'form' }]} description={t('operator_sections.42.description')} title={t('operator_sections.42.title')} />
			<LostAndFoundOperatorSection actions={[{ href: 'https://www.tsuldotejo.pt/index.php?page=perdidos', type: 'form' }]} description={t('operator_sections.43.description')} title={t('operator_sections.43.title')} />
			<LostAndFoundOperatorSection actions={[{ href: 'mailto:passageiros@alsa.pt', type: 'email' }]} description={t('operator_sections.44.description')} title={t('operator_sections.44.title')} />
		</>
	);

	//
}
