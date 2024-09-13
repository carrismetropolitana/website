/* * */

import NavigationMainMenu from '@/components/header/NavigationMainMenu';
import { mainNavigationGroup } from '@/settings/navigation.settings';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<div className={styles.container}>
			{mainNavigationGroup.map(item => (
				<NavigationMainMenu key={item._id} item={item} />
			))}
		</div>
	);
}
