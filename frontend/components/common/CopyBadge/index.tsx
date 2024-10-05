/* * */

import { useClipboard } from '@mantine/hooks';

import styles from './styles.module.css';

/* * */

interface Props {
	hasBorder?: boolean
	label?: string
	size?: 'lg' | 'md'
	value: number | string
}

/* * */

export default function CopyBadge({ hasBorder = true, label, size = 'md', value }: Props) {
	//

	//
	// A. Setup variables

	const clipboard = useClipboard({ timeout: 600 });

	//
	// B. Render components

	return (
		<div className={`${styles.container} ${hasBorder && styles.hasBorder} ${styles[size]}`} onClick={() => clipboard.copy(value)}>
			{clipboard.copied ? 'Copied' : label ? label : value}
		</div>
	);

	//
}
