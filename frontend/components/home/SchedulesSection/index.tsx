/* * */

import GridNav from '@/components/layout/GridNav';
import Section from '@/components/layout/Section';
import { mainNavigationGroup } from '@/settings/navigation.settings';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.SchedulesSection');
	const mainNavLabels = useTranslations('settings.navigation');
	const supportNavigationGroup = mainNavigationGroup.find(navGroup => navGroup._id === 'schedules');

	//
	// B. Transform data

	const menuItemsFormatted = supportNavigationGroup?.links.filter(item => item.target !== '_blank').map(item => ({ ...item, label: mainNavLabels(`schedules.links.${item._id}`) })) || [];

	//
	// C. Render Components

	return (
		<Section heading={t('section_heading')} withGap={false}>
			<GridNav className={styles.gridNav} items={menuItemsFormatted} />
		</Section>
	);

	//
}
