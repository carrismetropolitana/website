/* * */

import { Image } from '@mantine/core';
import { IconArrowRight, IconChevronRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	coverImageSrc?: string
	href?: string
	keywords?: { id?: string, value?: string }[]
	title?: string
}

/* * */

export function ProjectsCarouselCard({ coverImageSrc, href, keywords, title }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.ProjectsCarouselCard');

	const keywordItems = keywords?.filter(k => k.value?.trim()) ?? [];

	//
	// B. Render components

	return (
		<div className={styles.card}>
			<div className={styles.header}>

				{title && <p className={styles.title}>{title}</p>}

				{href && (
					<Link aria-label={t('learn_more')} className={styles.headerArrow} href={href} target="_blank">
						<IconChevronRight size={22} stroke={1.5} />
					</Link>
				)}

			</div>

			<div className={styles.imageArea}>

				<Image
					alt={title ?? ''}
					className={styles.image}
					fallbackSrc="/assets/common/placeholder.png"
					fit="contain"
					radius="var(--border-radius-lg)"
					src={coverImageSrc}
				/>

				{href && (
					<Link className={styles.learnMore} href={href} target="_blank">
						{t('learn_more')}
						<IconArrowRight size={18} />
					</Link>
				)}
			</div>

			{keywordItems.length > 0 && (
				<ul className={styles.keywords}>
					{keywordItems.map((k, i) => (
						<li key={`${k.value}-${i}`} className={styles.keyword}>
							{k.value?.startsWith('#') ? k.value : `#${k.value}`}
						</li>
					))}
				</ul>
			)}
		</div>
	);

	//
}
