/* * */

import FrontendLinesToolbarFilters from '@/components/FrontendLinesToolbarFilters/FrontendLinesToolbarFilters';
import FrontendLinesToolbarPeriods from '@/components/FrontendLinesToolbarPeriods/FrontendLinesToolbarPeriods';
import FrontendLinesToolbarSelectLine from '@/components/FrontendLinesToolbarSelectLine/FrontendLinesToolbarSelectLine';

import styles from './FrontendLinesToolbar.module.css';

/* * */

export default function FrontendLinesToolbar() {
	return (
		<div className={styles.container}>
			<FrontendLinesToolbarFilters />
			<FrontendLinesToolbarSelectLine />
			<FrontendLinesToolbarPeriods />
		</div>
	);
}
