/* * */

import styles from './styles.module.css';

/* * */

export default function Component({ color, short_name, size = 'md', text_color }) {
	return (
		<div className={`${styles.badge} ${styles[size]}`} style={{ backgroundColor: color, color: text_color }}>
			{short_name || '• • •'}
		</div>
	);
}
