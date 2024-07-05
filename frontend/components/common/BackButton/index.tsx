'use client';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

export default function Component() {
	const router = useRouter();
	const t = useTranslations('common');
	return (
		<div className={styles.container} onClick={router.back}>
			<IconArrowLeft size={10} stroke={3} width={20} />
			{t('back').toUpperCase()}
		</div>
	);
}
