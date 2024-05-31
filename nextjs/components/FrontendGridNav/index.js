/* * */

import FrontendGridNavItem from '@/components/FrontendGridNavItem';

import styles from './styles.module.css';

/* * */

export default function Component({ items = [] }) {
	return (
		<div className={`${styles.container}`}>{
			items.map((item, index) => (
				<FrontendGridNavItem key={index} href={item.href} icon={item.icon} label={item.label} />
			))
		}
		</div>
	);
}
