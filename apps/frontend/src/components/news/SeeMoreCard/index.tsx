import { IconArrowRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

interface SeeMoreCardProps {
	href: string
}

export function SeeMoreCard({ href }: SeeMoreCardProps) {
	const t = useTranslations('NewsCard');

	return (
		<Link className={styles.container} href={href}>
			<h4 className={styles.title}>{t('see_more')}...</h4>
		</Link>
	);
} 