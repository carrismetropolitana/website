'use client';

/* * */

import Button from '@/components/common/Button';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Routes } from '@/utils/routes';
import { IconArrowRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('planner.Page.Navegante');

	//
	// B. Handle Actions

	const handleClick = () => {
		window.open(`${Routes.NAVEGANTE}/viajar/planear-viagem`, '_blank');
	};

	//
	// C. Render Components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withPadding>
				<Button className={styles.button} icon={<IconArrowRight />} label={t('button')} onClick={handleClick} />
			</Section>
		</Surface>
	);

	//
}
