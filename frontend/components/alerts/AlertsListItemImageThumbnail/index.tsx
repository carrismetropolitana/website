/* * */

import { Link } from '@/translations/navigation';
import { Image } from '@mantine/core';
import { IconCircleArrowUpRightFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface AlertsListItemImageThumbnailProps {
	alt: string
	href: string
	src: string
}

/* * */

export default function Component({ alt, href, src }: AlertsListItemImageThumbnailProps) {
	return (
		<Link className={styles.container} href={href}>
			<IconCircleArrowUpRightFilled className={styles.icon} size={25} />
			<Image alt={alt} className={styles.image} fallbackSrc="/planner/placeholder.png" src={src} />
		</Link>
	);
}