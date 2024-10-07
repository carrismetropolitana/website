/* * */

import { Section } from '@/components/layout/Section';
import { Link } from '@/i18n/routing';
import { ImagesCommon } from '@/settings/assets.settings';
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
		<Section>
			<Link href={href}>
				<Image alt={title} className={styles.coverImage} fallbackSrc={ImagesCommon.PLACEHOLDER} src={coverImageSrc} />
			</Link>
		</Section>
	);

	//
}
