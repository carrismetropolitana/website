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

export function CopyBadge({ hasBorder = true, label, size = 'md', value }: Props) {
	//

	//
	// A. Setup variables

	const clipboard = useClipboard({ timeout: 600 });

	//
	// B. Handle actions

	const handleCopy = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		clipboard.copy(value);
	};

	//
	// C. Render components

	return (
		<>
			<div className={`${styles.container} ${hasBorder && styles.hasBorder} ${styles[size]}`} onClick={handleCopy}>
				{clipboard.copied ? 'Copied' : label ? label : value}
			</div>
		</>
	);

	//
}
