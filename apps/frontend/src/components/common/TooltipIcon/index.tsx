/* * */

import { Tooltip } from '@mantine/core';

/* * */

interface Props {
	icon: React.ReactNode
	label: string
	position?: 'bottom' | 'left' | 'right' | 'top'
	withArrow?: boolean
}

export function TooltipIcon({ icon, label, position = 'top', withArrow = true }: Props) {
	return (
		<Tooltip
			label={label}
			position={position}
			withArrow={withArrow}
		>
			{icon}
		</Tooltip>
	);
}
