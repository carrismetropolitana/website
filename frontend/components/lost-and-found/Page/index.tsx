/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import OperatorSection from '@/components/lost-and-found/OperatorSection';
import { IconsCommon, ImagesCommon } from '@/settings/assets.settings';
import { RoutesLostAndFound } from '@/utils/routes';
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
			<Surface>
				<Section heading={t('heading')} subheading={t('subheading')} withPadding>
					<Image alt="AML Map" className={styles.map} fallbackSrc={ImagesCommon.PLACEHOLDER} src={IconsCommon.AML_MAP_OPERATORS} />
				</Section>
			</Surface>
			<OperatorSection actions={[{ href: RoutesLostAndFound.VIACAO_ALVORADA, type: 'email' }]} description={t('operator_sections.41.description')} title={t('operator_sections.41.title')} />
			<OperatorSection actions={[{ href: RoutesLostAndFound.RODOVIARIA_LISBOA, type: 'form' }]} description={t('operator_sections.42.description')} title={t('operator_sections.42.title')} />
			<OperatorSection actions={[{ href: RoutesLostAndFound.TST, type: 'form' }]} description={t('operator_sections.43.description')} title={t('operator_sections.43.title')} />
			<OperatorSection actions={[{ href: RoutesLostAndFound.ALSA, type: 'email' }]} description={t('operator_sections.44.description')} title={t('operator_sections.44.title')} />
		</>
	);

	//
}
