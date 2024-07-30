/* * */

import { Button } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface ButtonDefaultProps {
	icon?: React.ReactNode
	label: string
	onClick?: () => void
}

/* * */

export default function Component({ icon, label, onClick }: ButtonDefaultProps) {
	return (
		<Button className={styles.container} leftSection={icon && icon} onClick={onClick}>
			{label}
		</Button>
	);
}
