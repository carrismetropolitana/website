/* * */

import { Link } from '@/translations/navigation';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface FeaturedSectionCardProps {
	_id: string
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
