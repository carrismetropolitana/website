'use client';

import { Button, Menu } from '@mantine/core';
import { IconCaretDownFilled } from '@tabler/icons-react';
import Link from 'next/link';

import LiveIcon from '../LiveIcon/LiveIcon';
import styles from './FrontendHeaderMenu.module.css';

export default function FrontendHeaderMenu({ items, title }) {
	return (
		<Menu position="bottom-end" shadow="md" width={200}>
			<Menu.Target>
				<Button color="black" rightSection={<IconCaretDownFilled size={20} />} size="md" variant="subtle">
					{title}
				</Button>
			</Menu.Target>
			<Menu.Dropdown miw={200} w="auto">
				{items.map(item => (
					<Link key={item.url} href={item.url} target={item.target || '_self'}>
						<Menu.Item className={item.realtime && styles.realtime}>
							<div className={styles.menuItem}>
								{item.label}
								{' '}
								{item.realtime && <LiveIcon />}
							</div>
						</Menu.Item>
					</Link>
				),

				)}
			</Menu.Dropdown>
		</Menu>
	);
}
