/* * */

import SelectOperationalDay from '@/components/common/SelectOperationalDay';
import Section from '@/components/layout/Section';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<Section childrenWrapperStyles={styles.container} withGap={false} withTopPadding={false} withChildrenPadding>
			<div className={styles.operationalDaySelectorWrapper}>
				<SelectOperationalDay />
			</div>
		</Section>
	);
}
