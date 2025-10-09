/* * */

import styles from './styles.module.css';

/* * */

export interface LoaderProps {
	size?: 'lg' | 'md' | 'sm' | 'xl'
	visible?: boolean
}

/* * */

export function Loader({ size = 'md', visible = true }: LoaderProps) {
	//

	if (!visible) {
		return null;
	}

	return (
		<div className={styles.root} data-size={size} data-visible={visible}>
			<div className={styles.blade} />
			<div className={styles.blade} />
			<div className={styles.blade} />
			<div className={styles.blade} />
			<div className={styles.blade} />
			<div className={styles.blade} />
			<div className={styles.blade} />
			<div className={styles.blade} />
		</div>
	);

	//
}
