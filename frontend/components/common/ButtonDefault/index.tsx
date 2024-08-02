/* * */

import { Link } from '@/translations/navigation';
import { Button } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface ButtonDefaultProps {
	href?: string
	icon?: React.ReactNode
	label: string
	onClick?: () => void
	target?: string
}

/* * */

export default function Component({ href, icon, label, onClick, target }: ButtonDefaultProps) {
	//

	//
	// A. Render components

	if (href) {
		return (
			<Button className={styles.container} component={Link} href={href} leftSection={icon && icon} target={target}>
				{label}
			</Button>
		);
	}

	return (
		<Button className={styles.container} leftSection={icon && icon} onClick={onClick}>
			{label}
		</Button>
	);

	//
}
