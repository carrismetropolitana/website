/* * */

import HeaderLogo from '@/components/header/Logo';
import HeaderNavigationAccount from '@/components/header/NavigationAccount';
import HeaderNavigationMain from '@/components/header/NavigationMain';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<>
			<div className={styles.spacer} />
			<div className={styles.container}>
				<div className={styles.mainWrapper}>
					<HeaderLogo />
					<div className={styles.navWrapper}>
						<HeaderNavigationMain />
						<HeaderNavigationAccount />
					</div>
				</div>
			</div>
		</>
	);
}
