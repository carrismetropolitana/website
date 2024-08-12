'use client';

/* * */

import { useDebugContext } from '@/contexts/Debug.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ className }) {
	//

	//
	// A. Setup variables

	const debugContext = useDebugContext();
	const t = useTranslations('footer.DebugToggle');

	// B. Render Components

	return (
		<div className={`${className} ${debugContext.flags.is_debug_mode ? styles.enabled : styles.disabled} ${styles.toggle}`} onClick={debugContext.actions.toggleDebugMode}>
			{debugContext.flags.is_debug_mode ? t('enabled') : t('disabled')}
		</div>
	);

	//
}
