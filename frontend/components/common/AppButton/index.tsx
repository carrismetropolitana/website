/* * */

import { Link } from '@/i18n/routing';
import { Button } from '@mantine/core';
import React from 'react';

/* * */

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string
	label: string
	onClick?: () => void
	variant?: 'danger' | 'disabled' | 'muted' | 'primary' | 'secondary'
}

/* * */

export default function Component({ href, label, onClick, variant = 'primary' }: Props) {
	//

	if (href) {
		return (
			<Button component={Link} href={href} variant={variant}>
				{label}
			</Button>
		);
	}

	return (
		<Button onClick={onClick} variant={variant}>
			{label}
		</Button>
	);

	//
}
