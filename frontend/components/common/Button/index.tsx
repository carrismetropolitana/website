/* * */

import { Link } from '@/translations/navigation';
import { Button } from '@mantine/core';
import classNames from 'classnames';
import React from 'react';

import styles from './styles.module.css';

/* * */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string
	icon?: React.ReactNode
	label: string
	onClick?: () => void
	target?: string
	variant?: 'danger' | 'default' | 'info' | 'ok' | 'pill' | 'primary' | 'warning'
}

/* * */

export default function Component({ className, href, icon, label, onClick, target, variant = 'default' }: ButtonProps) {
	//

	const btnClass = classNames(className, styles.button, {
		[styles.danger]: variant === 'danger',
		[styles.info]: variant === 'info',
		[styles.ok]: variant === 'ok',
		[styles.primary]: variant === 'primary',
		[styles.warning]: variant === 'warning',
	});

	if (href) {
		return (
			<Button className={btnClass} component={Link} href={href} leftSection={icon && icon} target={target} variant={variant}>
				{label}
			</Button>
		);
	}

	return (
		<Button className={btnClass} leftSection={icon && icon} onClick={onClick} variant={variant}>
			{label}
		</Button>
	);

	//
}
