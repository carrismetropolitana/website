/* * */

import Button from '@/components/common/Button';
import { IconShare } from '@tabler/icons-react';

import styles from '../Review2025Card/styles.module.css';

/* * */

export function Review2025CardFooter({ isOpen }: { isOpen: boolean }) {
	//
	return (
		<div className={`${styles.footer} ${styles.contentCollapsible}`} data-open={isOpen}>
			<Button className={styles.button} icon={<IconShare />} label="Partilhar" />
		</div>
	);
	//
}
