/* * */

import { GridNavItem } from '@/components/layout/GridNavItem';

import styles from './styles.module.css';

/* * */

interface Props {
	className?: string
	items: {
		_id?: string
		description?: string
		href?: string
		icon?: React.ReactNode
		label?: string
	}[]
}

/* * */

export function GridNav({ className = '', items = [] }: Props) {
	return (
		<div className={`${styles.container} ${className}`}>
			{items.map((item, index) => (
				<GridNavItem key={index} description={item.description} href={item.href} icon={item.icon} label={item.label} />
			))}
		</div>
	);
}
