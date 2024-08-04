/* * */

import { Link } from '@/translations/navigation';
import { Button } from '@mantine/core';

/* * */

interface ButtonProps {
	href?: string
	icon?: React.ReactNode
	label: string
	onClick?: () => void
	target?: string
	variant?: 'default' | 'pill'
}

/* * */

export default function Component({ href, icon, label, onClick, target, variant = 'default' }: ButtonProps) {
	//

	if (href) {
		return (
			<Button component={Link} href={href} leftSection={icon && icon} target={target} variant={variant}>
				{label}
			</Button>
		);
	}

	return (
		<Button leftSection={icon && icon} onClick={onClick} variant={variant}>
			{label}
		</Button>
	);

	//
}
