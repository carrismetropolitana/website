'use client';

/* * */

import { useDebugContext } from '@/contexts/DebugContext';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ className }) {
	//

	//
	// A. Setup variables

	const debugContext = useDebugContext();
	const t = useTranslations('FrontendFooterDebug');

	// B. Render Components

	return (
		<div className={`${className} ${debugContext.isDebug ? styles.enabled : styles.disabled} ${styles.toggle}`} onClick={debugContext.toggleIsDebug}>
			{debugContext.isDebug ? t('enabled') : t('disabled')}
		</div>
	);

	//
}
