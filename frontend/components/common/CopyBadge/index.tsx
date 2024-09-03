import { useClipboard } from '@mantine/hooks';

import styles from './styles.module.css';

export default function CopyBadge({ hasBorder = true, label, value }: { hasBorder?: boolean, label?: string, value: number | string }) {
	//

	//
	// A. Setup variables

	const clipboard = useClipboard({ timeout: 600 });

	//
	// D. Render components

	return (
		<div className={`${styles.container} ${hasBorder && styles.border}`} onClick={() => clipboard.copy(value)}>
			{clipboard.copied ? 'Copied' : label ? label : value}
		</div>
	);
}
