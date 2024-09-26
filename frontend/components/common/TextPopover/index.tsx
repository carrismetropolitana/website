import { MantineSize, Popover, PopoverProps, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import styles from './styles.module.css';

interface ComponentProps extends PopoverProps {
	children?: React.ReactNode
	text: string
	textSize?: MantineSize
}

export default function Component({
	children,
	position = 'bottom',
	shadow = 'md',
	text,
	textSize = 'xs',
	withArrow = true,
	...props
}: ComponentProps) {
	const [opened, { close, open }] = useDisclosure(false);

	return (
		<div className={styles.popover}>
			<Popover opened={opened} position={position} shadow={shadow} withArrow={withArrow} {...props}>
				<Popover.Target>
					<div onMouseEnter={open} onMouseLeave={close}>
						{children}
					</div>
				</Popover.Target>
				<Popover.Dropdown>
					<Text size={textSize}>{text}</Text>
				</Popover.Dropdown>
			</Popover>
		</div>
	);
}
