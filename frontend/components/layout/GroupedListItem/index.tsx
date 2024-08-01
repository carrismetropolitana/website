/* * */

import styles from './styles.module.css';

/* * */

interface GroupedListItemProps {
	children: React.ReactNode
	label: string
	title: string
}

/* * */

export default function Component({ children, label, title }: GroupedListItemProps) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h6 className={styles.label}>{label}</h6>
				<h2 className={styles.title}>{title}</h2>
			</div>
			{children}
		</div>
	);
}
