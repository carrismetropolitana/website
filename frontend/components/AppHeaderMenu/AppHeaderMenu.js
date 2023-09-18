'use client';

import Link from 'next/link';
import styles from './AppHeaderMenu.module.css';
import { Menu, Button } from '@mantine/core';
import { IconCaretDownFilled } from '@tabler/icons-react';

export default function AppHeaderMenu({ title, items }) {
  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Button variant="subtle" color="black" size="md" rightSection={<IconCaretDownFilled size={20} />}>
          {title}
        </Button>
      </Menu.Target>
      <Menu.Dropdown miw={200} w={'auto'}>
        {items.map((item) => (
          <Link key={item.url} href={item.url} target={item.target || '_self'}>
            <Menu.Item className={styles.menuItem}>{item.label}</Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
