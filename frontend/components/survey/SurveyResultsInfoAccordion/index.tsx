/* * */

import { Accordion, AccordionControl, Text } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function SurveyResultsInfoAccordion() {
	//

	//
	// A. Setup Variables
	const t = useTranslations('survey.SurveyResultsInfoAccordion');
	//
	// B. Render Components
	return (
		<Accordion className={styles.accordionAboutResults}>
			<Accordion.Item value="InfoResults">
				<AccordionControl className={styles.control} icon={<IconInfoCircleFilled />}><Text className={styles.control}>{t('heading')}</Text></AccordionControl>
				<Accordion.Panel>
					<div className={styles.desc1}>
						<Text dangerouslySetInnerHTML={{ __html: t.raw('description1') }} />
					</div>
					<div className={styles.desc2}>
						<Text>
							{t('description2')}
						</Text>
					</div>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);

	//
}
