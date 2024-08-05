/* * */

import { Link } from '@/translations/navigation';
import { Image } from '@mantine/core';
import { IconCircleArrowUpRightFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface AlertsListItemImageThumbnailProps {
	alt: string
	blur?: 'always' | 'hover'
	href: string
	size?: 'lg' | 'sm'
	src: string
	target?: string
}

/* * */

export default function Component({ alt, blur = 'always', href, size = 'sm', src, target }: AlertsListItemImageThumbnailProps) {
	return (
		<Link className={`${styles.container} ${styles[size]} ${blur === 'always' ? styles.blurAlways : styles.blurHover}`} href={href} target={target}>
			<IconCircleArrowUpRightFilled className={styles.icon} size={25} />
			<Image alt={alt} className={styles.image} fallbackSrc="/planner/placeholder.png" src={src} />
		</Link>
	);
}
