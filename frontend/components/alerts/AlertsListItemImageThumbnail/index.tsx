/* * */

import { Link } from '@/i18n/routing';
import { ImagesCommon } from '@/utils/assets';
import { Image } from '@mantine/core';
import { IconCircleArrowUpRightFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface AlertsListItemImageThumbnailProps {
	alt: string
	href: string
	src: string
	target?: string
}

/* * */

export default function Component({ alt, href, src, target }: AlertsListItemImageThumbnailProps) {
	return (
		<Link className={styles.container} href={href} target={target}>
			<IconCircleArrowUpRightFilled className={styles.icon} size={25} />
			<Image alt={alt} className={styles.image} fallbackSrc={ImagesCommon.PLACEHOLDER} src={src} />
		</Link>
	);
}
