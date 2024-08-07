/* * */

import GridNavItem from '@/components/layout/GridNavItem';

import styles from './styles.module.css';

/* * */

export default function Component({ className = '', items = [] }) {
	return (
		<div className={`${styles.container} ${className}`}>{
			items.map((item, index) => (
				<GridNavItem key={index} href={item.href} icon={item.icon} label={item.label} />
			))
		}
		</div>
	);
}
