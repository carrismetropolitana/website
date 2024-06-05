/* * */

import { UnstyledButton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export default function Component({ component = 'div', onClick = () => null, withName = false }) {
	//

	if (component === 'button') {
		return (
			<div className={`${styles.container} ${styles.asButton}`}>
				<UnstyledButton className={styles.userPic} onClick={onClick}>🐙</UnstyledButton>
				{withName && <span className={styles.userName}>Polvo Ecológico</span>}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.userPic}>🐙</div>
			{withName && <span className={styles.userName}>Polvo Ecológico</span>}
		</div>
	);

	//
}
