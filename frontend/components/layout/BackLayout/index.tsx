import BackButton from '@/components/common/BackButton';

import styles from './styles.module.css';

export default function BackLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div className={styles.header}>
				<BackButton />
			</div>
			{children}
		</div>
	);
}
