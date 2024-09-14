/* * */

import { Link } from '@/i18n/routing';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface FeaturedSectionCardProps {
	coverImageSrc: string
	href: string
	title: string
}

/* * */

export default function Component({ coverImageSrc, href, title }: FeaturedSectionCardProps) {
	//

	//
	// C. Render Components

	return (
		<Link href={href}>
			<Image alt={title} className={styles.coverImage} fallbackSrc="/news/placeholder.png" src={coverImageSrc} />
		</Link>
	);

	//
}
