/* * */

import styles from './styles.module.css';

/* * */

interface LineNameProps {
	longName?: string
}

/* * */

export default function Component({ longName }: LineNameProps) {
	return <div className={styles.name}>{longName || '• • •'}</div>;
}
