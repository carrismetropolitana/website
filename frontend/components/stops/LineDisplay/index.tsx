import LineBadge from '@/components/common/LineBadge';

import styles from './styles.module.css';

function LineName({ long_name }) {
	return <div className={styles.name}>{long_name || '• • •'}</div>;
}

/* * */

export default function LineDisplay({ color = '#000000', long_name, short_name, text_color = '#ffffff' }) {
	return (
		<div className={styles.container}>
			<LineBadge color={color} shortName={short_name} textColor={text_color} />
			<LineName long_name={long_name} />
		</div>
	);
}
