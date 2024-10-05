/* * */

import { SelectOperationalDay } from '@/components/common/SelectOperationalDay';
import { Section } from '@/components/layout/Section';
import SelectActivePatternGroup from '@/components/lines/SelectActivePatternGroup';
// import SelectActivePatternGroupExplainer from '@/components/lines/SelectActivePatternGroupExplainer';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<Section childrenWrapperStyles={styles.container} withGap={false} withTopPadding={false} withChildrenPadding>
			{/* <div className={styles.patternSelectorExplainerWrapper}>
				<SelectActivePatternGroupExplainer />
			</div> */}
			<div className={styles.operationalDaySelectorWrapper}>
				<SelectOperationalDay />
			</div>
			<div className={styles.patternSelectorWrapper}>
				<SelectActivePatternGroup />
			</div>
		</Section>
	);
}
