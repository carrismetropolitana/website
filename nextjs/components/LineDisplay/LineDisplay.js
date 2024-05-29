/* * */

import Loader from '../Loader/Loader';
import styles from './LineDisplay.module.css';

/* * */

export function LineBadge({ color, short_name, size = 'md', text_color }) {
	return (
		<div className={`${styles.badge} ${styles[size]}`} style={{ backgroundColor: color, color: text_color }}>
			{short_name || '• • •'}
		</div>
	);
}

/* * */

export function LineName({ long_name }) {
	return <div className={styles.name}>{long_name || '• • •'}</div>;
}

/* * */

export default function LineDisplay({ color = '#000000', long_name, short_name, text_color = '#ffffff' }) {
	return !short_name || !long_name
		? <Loader size={20} visible />
		: (
			<div className={styles.container}>
				<LineBadge color={color} short_name={short_name} text_color={text_color} />
				<LineName long_name={long_name} />
			</div>
		);
}
