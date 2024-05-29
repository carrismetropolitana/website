'use client';

/* * */

import FrontendFooterLegal from '@/components/FrontendFooterLegal/FrontendFooterLegal';
import FrontendFooterLogo from '@/components/FrontendFooterLogo/FrontendFooterLogo';
import FrontendFooterNav from '@/components/FrontendFooterNav/FrontendFooterNav';
import { useDebugContext } from '@/contexts/DebugContext';

import styles from './FrontendFooter.module.css';

/* * */

export default function FrontendFooter() {
	//

	//
	// A. Setup variables

	const debugContext = useDebugContext();

	//
	// B. Render Components

	return (
		<footer className={`${styles.container} ${debugContext.isDebug && styles.debugEnabled}`}>
			<div className={styles.grid}>
				<FrontendFooterLogo />
				<FrontendFooterNav />
			</div>
			<FrontendFooterLegal />
		</footer>
	);

	//
}
