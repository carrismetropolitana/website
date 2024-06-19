/* * */

import HeaderAccount from '@/components/header/Account';
import HeaderLogo from '@/components/header/Logo';
import HeaderNavigation from '@/components/header/Navigation';

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
						<HeaderNavigation />
						<HeaderAccount />
					</div>
				</div>
			</div>
		</>
	);
}
