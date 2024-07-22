'use client';

/* * */

import { IconAlertTriangleFilled, IconCircleCheckFilled, IconInfoCircleFilled, IconInfoTriangleFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

// const appStatusData = null;

const appStatusData = {
	body: 'Estamos a desenvolver todos os esforços para resolver a situação. Obrigado pela sua compreensão.',
	more_info: {
		href: 'https://developer.carrismetropolitana.pt/blog/...',
		label: 'Saber Mais',
	},
	style: 'danger',
	title: 'Instabilidade temporária no tempo real',
};

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	// const t = useTranslations('AppStatus');

	//
	// B. Fetch data

	// const { data: appStatusData } = useSWR('https://api.carrismetropolitana.pt/status/message');

	//
	// D. Render Components

	return appStatusData && (
		<div className={`${styles.container} ${styles[`style_${appStatusData.style}`]}`}>
			<div className={styles.iconWrapper}>
				{appStatusData.style === 'info' && <IconInfoCircleFilled className={styles.icon} size={22} />}
				{appStatusData.style === 'ok' && <IconCircleCheckFilled className={styles.icon} size={22} />}
				{appStatusData.style === 'warning' && <IconInfoTriangleFilled className={styles.icon} size={22} />}
				{appStatusData.style === 'danger' && <IconAlertTriangleFilled className={styles.icon} size={22} />}
			</div>
			<div className={styles.tickerWrapper}>
				<div className={styles.tickerMessage}>
					<span className={styles.tickerTitle}>{appStatusData.title}</span>
					<span className={styles.tickerDivider}>—</span>
					<span className={styles.tickerBody}>{appStatusData.body}</span>
				</div>
			</div>
			{/* <h2 className={styles.subtitle}>{t('subtitle')}</h2> */}
			{/* <Button color="orange" onClick={handleGoToHomepage} size="xs" variant="subtle">
				{t('goto_home')}
			</Button> */}
		</div>
	);

	//
}
