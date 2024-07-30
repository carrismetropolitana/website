'use client';

/* * */

import ButtonDefault from '@/components/common/ButtonDefault';
import LayoutSection from '@/components/layout/Section';
import { IconAt, IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface LostAndFoundOperatorSectionProps {
	actions: LostAndFoundOperatorSectionActionProps[]
	description: string
	title: string
}

interface LostAndFoundOperatorSectionActionProps {
	href: string
	type: 'email' | 'form'
}

/* * */

export default function Component({ actions, description, title }: LostAndFoundOperatorSectionProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('LostAndFoundOperatorSection');

	//
	// B. Render components

	return (
		<LayoutSection withChildrenPadding>
			<div className={styles.innerWrapper}>
				<h3 className={styles.title}>{title}</h3>
				<h3 className={styles.description}>{description}</h3>
				<div className={styles.actionsWrapper}>
					{actions.map(action => (
						<div key={action.href} className={styles.actionItem}>
							{action.type === 'email' && <ButtonDefault icon={<IconAt size={18} />} label={t('email.label')} onClick={() => window.open(action.href, '_blank')} />}
							{action.type === 'form' && <ButtonDefault icon={<IconExternalLink size={18} />} label={t('form.label')} onClick={() => window.open(action.href, '_blank')} />}
						</div>
					))}
				</div>
			</div>
		</LayoutSection>
	);

	//
}
