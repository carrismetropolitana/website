/* * */

import styles from './styles.module.css';

/* * */

interface FoundItemsCounterProps {
	text: string
}

/* * */

export default function Component({ text }: FoundItemsCounterProps) {
	return (
		<p className={styles.text}>{text}</p>
	);
}
