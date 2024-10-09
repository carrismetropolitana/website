/* * */

import GridNavItem from '@/components/layout/GridNavItem';

import styles from './styles.module.css';

/* * */

interface Props {
	className?: string
	items: {
		_id?: string
		href?: string
		icon?: React.ReactNode
		label?: string
	}[]
}

/* * */

export default function Component({ className = '', items = [] }: Props) {
	return (
		<div className={`${styles.container} ${className}`}>
			{items.map((item, index) => (
				<GridNavItem key={index} href={item.href} icon={item.icon} label={item.label} />
			))}
		</div>
	);
}
