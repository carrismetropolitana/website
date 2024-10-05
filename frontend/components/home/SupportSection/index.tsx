/* * */

import GridNav from '@/components/layout/GridNav';
import { Section } from '@/components/layout/Section';
import { mainNavigationGroup } from '@/settings/navigation.settings';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.SupportSection');
	const mainNavLabels = useTranslations('settings.navigation');
	const navigationGroup = mainNavigationGroup.find(navGroup => navGroup._id === 'support');

	//
	// B. Transform data

	const menuItemsFormatted = navigationGroup?.links.map(item => ({ ...item, label: mainNavLabels(`support.links.${item._id}`) })) || [];

	//
	// C. Render Components

	return (
		<Section heading={t('section_heading')} withGap={false}>
			<GridNav className={styles.gridNav} items={menuItemsFormatted} />
		</Section>
	);

	//
}
