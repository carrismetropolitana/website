/* * */

import Section from '@/components/layout/Section';
import OperatorSection from '@/components/lost-and-found/OperatorSection';
import { IconsCommon, ImagesCommon } from '@/utils/assets';
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
			<Section heading={t('heading')} subheading={t('subheading')} withGap={false} withTopBorder={false} withChildrenPadding>
				<Image alt="AML Map" className={styles.map} fallbackSrc={ImagesCommon.PLACEHOLDER} src={IconsCommon.AML_MAP_OPERATORS} />
			</Section>
			<OperatorSection actions={[{ href: 'mailto:passageiro@viacaoalvorada.pt', type: 'email' }]} description={t('operator_sections.41.description')} title={t('operator_sections.41.title')} />
			<OperatorSection actions={[{ href: 'https://www.rodoviariadelisboa.pt/perdidoAchado', type: 'form' }]} description={t('operator_sections.42.description')} title={t('operator_sections.42.title')} />
			<OperatorSection actions={[{ href: 'https://www.tsuldotejo.pt/index.php?page=perdidos', type: 'form' }]} description={t('operator_sections.43.description')} title={t('operator_sections.43.title')} />
			<OperatorSection actions={[{ href: 'mailto:passageiros@alsa.pt', type: 'email' }]} description={t('operator_sections.44.description')} title={t('operator_sections.44.title')} />
		</>
	);

	//
}
