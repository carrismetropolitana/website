/* * */

import Loader from '@/components/common/Loader';
import LineBadge from '@/components/lines/LineBadge';
import LineName from '@/components/lines/LineName';
import { Line } from '@/types/lines.types';

import styles from './styles.module.css';

/* * */

interface LineDisplayProps {
	isLoading?: boolean
	line: Line
	size?: 'lg' | 'md'
}

/* * */

export default function Component({ isLoading = false, line, size = 'md' }: LineDisplayProps) {
	return isLoading
		? <Loader size={20} visible />
		: (
			<div className={styles.container}>
				<LineBadge color={line.color} shortName={line.short_name} size={size} textColor={line.text_color} />
				<LineName longName={line.long_name} />
			</div>
		);
}
