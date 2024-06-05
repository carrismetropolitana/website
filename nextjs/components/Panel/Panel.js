// 'use client';

import Loader from '@/components/Loader/Loader';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import { useTranslations } from 'next-intl';

import styles from './Panel.module.css';

export default function Panel({ children, error, icon, loading, rightSection, title, type = 'A' }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('Panel');

	//
	// B. Render components

	return (
		<div className={`${styles.container} ${type === 'A' && styles.typeA} ${type === 'B' && styles.typeB}`}>
			<div className={styles.header}>
				<div className={styles.headerLeftSection}>
					{icon && <div className={styles.headerIcon}>{icon}</div>}
					{title && <h2 className={styles.headerTitle}>{title}</h2>}
				</div>
				{rightSection && <div className={styles.headerRightSection}>{rightSection}</div>}
			</div>
			{error
			&& (
				<div className={styles.wrapper}>
					<div className={styles.isError}>
						<NoDataLabel text={t('error')} />
					</div>
				</div>
			)}
			{loading
			&& (
				<div className={styles.wrapper}>
					<div className={styles.isLoading}>
						<Loader visible />
					</div>
				</div>
			)}
			{!error && !loading
			&& (
				<div className={styles.wrapper}>
					<div className={styles.content}>{children}</div>
				</div>
			)}
		</div>
	);

	//
}
