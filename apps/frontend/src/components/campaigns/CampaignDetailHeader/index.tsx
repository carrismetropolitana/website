'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface CampaignDetailHeaderProps {
	title?: string
}

export function CampaignDetailHeader({ title }: CampaignDetailHeaderProps) {
	if (!title) {
		return (
			<Section withBottomDivider withGap withPadding>
				<Skeleton className={styles.titleSkeleton} />
			</Section>
		);
	}

	return (
		<Section withBottomDivider withGap withPadding>
			<h1 className={styles.title}>{title}</h1>
		</Section>
	);
}
