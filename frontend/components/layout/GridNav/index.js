/* * */

import LayoutGridNavItem from '@/components/layout/GridNavItem';

import styles from './styles.module.css';

/* * */

export default function Component({ className = '', items = [] }) {
	return (
		<div className={`${styles.container} ${className}`}>{
			items.map((item, index) => (
				<LayoutGridNavItem key={index} href={item.href} icon={item.icon} label={item.label} />
			))
		}
		</div>
	);
}
