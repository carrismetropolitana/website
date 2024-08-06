/* * */

import Loader from '@/components/common/Loader';
import LineBadge from '@/components/lines/LineBadge';
import LineName from '@/components/lines/LineName';

import styles from './styles.module.css';

/* * */

export default function Component({ color = '#000000', long_name, short_name, text_color = '#ffffff' }) {
	return !short_name || !long_name
		? <Loader size={20} visible />
		: (
			<div className={styles.container}>
				<LineBadge color={color} short_name={short_name} text_color={text_color} />
				<LineName long_name={long_name} />
			</div>
		);
}
