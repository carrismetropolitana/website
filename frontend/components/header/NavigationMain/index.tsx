/* * */

import NavigationMainMenu from '@/components/header/NavigationMainMenu';
import { headerNavigationGroup } from '@/settings/navigation';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<div className={styles.container}>
			{headerNavigationGroup.map(item => (
				<NavigationMainMenu key={item._id} item={item} />
			))}
		</div>
	);
}
