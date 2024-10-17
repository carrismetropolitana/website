'use client';

/* * */

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	defaultState?: boolean
	isHiddenLabel?: string
	isVisibleLabel?: string
}

/* * */

export function ExpandToggle({ children, defaultState, isHiddenLabel, isVisibleLabel }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.ExpandToggle');
	const [isVisible, setIsVisible] = useState(defaultState);

	//
	// B. Handle actions

	const handleToggle = () => {
		setIsVisible(prev => !prev);
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<div className={styles.toggle} onClick={handleToggle}>
				{isVisible ? (isVisibleLabel || t('is_visible.label')) : (isHiddenLabel || t('is_hidden.label'))}
			</div>
			{isVisible && (
				<div className={styles.childrenWrapper}>
					{children}
				</div>
			)}
		</div>
	);

	//
}
