/* * */

import FrontendGridNavItem from '@/components/FrontendGridNavItem';

import styles from './styles.module.css';

/* * */

export default function Component({ className = '', items = [] }) {
	return (
		<div className={`${styles.container} ${className}`}>{
			items.map((item, index) => (
				<FrontendGridNavItem key={index} href={item.href} icon={item.icon} label={item.label} />
			))
		}
		</div>
	);
}
