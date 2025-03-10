'use client';

/* * */

import Button from '@/components/common/Button';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { IconAt, IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface LostAndFoundOperatorSectionActionProps {
	href: string
	type: 'email' | 'form'
}

interface LostAndFoundOperatorSectionProps {
	actions: LostAndFoundOperatorSectionActionProps[]
	description: string
	title: string
}

/* * */

export default function Component({ actions, description, title }: LostAndFoundOperatorSectionProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('lost-and-found.OperatorSection');
	const analyticsContext = useAnalyticsContext();

	//
	// B. Handle  Actions

	const handleFormClick = (actionType) => {
		analyticsContext.actions.capture(ampli => ampli.lostAndFoundAreaClicked({ action_type: actionType, area_clicked: title }));
	};

	//
	// C. Render components

	return (
		<Surface>
			<Section withGap withPadding>
				<h3 className={styles.title}>{title}</h3>
				<h3 className={styles.description}>{description}</h3>
				<div className={styles.actionsWrapper}>
					{actions.map(action => (
						<div key={action.href} className={styles.actionItem} onClick={() => handleFormClick(action.type)}>
							{action.type === 'email' && <Button href={action.href} icon={<IconAt size={18} />} label={t('email.label')} target="_blank" />}
							{action.type === 'form' && <Button href={action.href} icon={<IconExternalLink size={18} />}label={t('form.label')} target="_blank" />}
						</div>
					))}
				</div>
			</Section>
		</Surface>
	);

	//
}
