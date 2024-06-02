/* * */

import FrontendHeaderAccount from '@/components/FrontendHeaderAccount';
import FrontendHeaderLogo from '@/components/FrontendHeaderLogo';
import FrontendHeaderNav from '@/components/FrontendHeaderNav';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<>
			<div className={styles.spacer} />
			<div className={styles.container}>
				<div className={styles.mainWrapper}>
					<FrontendHeaderLogo />
					<div className={styles.navWrapper}>
						<only-desktop>
							<FrontendHeaderNav />
						</only-desktop>
						<FrontendHeaderAccount />
					</div>
				</div>
			</div>
		</>
	);
}
