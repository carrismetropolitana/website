'use client';

/* * */

import Button from '@/components/common/Button';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { Routes } from '@/utils/routes';
import { IconArrowRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function PlannerNavegante() {
	//

	//
	// A. Setup variables

	const t = useTranslations('planner.PlannerNavegante');
	const analyticsContext = useAnalyticsContext();

	//
	// B. Handle actions

	const handleClick = () => {
		analyticsContext.actions.capture(ampli => ampli.plannerUsed({ planner_clicked: 'Navegante' }));
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
