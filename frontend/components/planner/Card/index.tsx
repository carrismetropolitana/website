/* * */

import { Link } from '@/i18n/routing';
import { ImagesCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export interface PlannerCardProps {
	description: string
	imageUrl: string
	title: string
	url: string
}

/* * */

export default function Component({ description, imageUrl, title, url }: PlannerCardProps) {
	return (
		<Link className={styles.container} href={url} target="_blank">
			<Image alt={title} className={styles.coverImage} fallbackSrc={ImagesCommon.PLACEHOLDER} src={imageUrl} />
			<div className={styles.content}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.description}>{description}</p>
			</div>
		</Link>
	);
}
