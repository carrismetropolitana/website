import { Link } from '@/translations/navigation';
import { IconArrowRight } from '@tabler/icons-react';
import { LegacyRef } from 'react';

import styles from '../styles.module.css';

// Single line component
export default function Component({ line, refFn, style }: {
	line: { color: string, id: string, long_name: string, short_name: string, text_color: string }
	refFn?: LegacyRef<HTMLAnchorElement>
	style?: React.CSSProperties }) {
	return (
		<Link ref={refFn} className={styles.line} href={`/lines/${line.id}`} style={style}>
			<div className={styles.label}>
				<div className={styles.badge} style={{ backgroundColor: line.color, color: line.text_color }}>{line.short_name}</div>
				<div className={styles.name}>{line.long_name}</div>
			</div>
			<IconArrowRight className={styles.arrow} size={24} />
		</Link>
	);
}
