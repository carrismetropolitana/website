'use client';

/* * */

import FrontendGridNav from '@/components/FrontendGridNav';
import FrontendSection from '@/components/FrontendSection';
import FrontendText from '@/components/FrontendText';
import { IconAlertTriangle, IconArrowLoopRight, IconBusStop, IconSignRight } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

const MENU_ITEMS = [
	{ href: '/', icon: <IconArrowLoopRight />, label: 'Horários por Linha' },
	{ href: '/', icon: <IconBusStop />, label: 'Horários por Paragem' },
	{ href: '/', icon: <IconSignRight />, label: 'Planear Viagem' },
	{ href: '/', icon: <IconAlertTriangle />, label: 'Alertas de Serviço' },
];

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	//
	// C. Render Components

	return (
		<FrontendSection heading="Notícias">
			news slider
		</FrontendSection>
	);

	//
}
