/* * */

import { Link } from '@/i18n/routing';
import { ImagesCommon } from '@/utils/assets';
import { Image } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	coverImageSrc: string
	href?: string
	target?: string
	title: string
}

/* * */

export default function Component({ coverImageSrc, href, target, title }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.MainCarouselCard');

	//
	// B. Render components

	if (!href) {
		return (
			<Image alt={title} fallbackSrc={ImagesCommon.PLACEHOLDER} src={coverImageSrc} />
		);
	}

	return (
		<div className={styles.container}>
			<Link className={styles.learnMore} href={href} target={target}>
				{t('learn_more')}
				<IconArrowRight size={18} />
			</Link>
			<Image alt={title} fallbackSrc={ImagesCommon.PLACEHOLDER} src={coverImageSrc} />
		</div>
	);

	//
}
