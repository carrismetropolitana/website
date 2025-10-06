import { IconFileDownload, IconLink } from '@tabler/icons-react';
import React from 'react';

import styles from './styles.module.css';

interface NewsItem {
	date: string
	id: string
	image: string
	isLink: boolean
	title: string
	topic: string
}

interface PressGenericCardProps {
	newsItem: NewsItem
	onClick?: (newsItem: NewsItem) => void
	showTopic?: boolean
}

export function PressGenericCard({ newsItem, onClick, showTopic = false }: PressGenericCardProps) {
	const handleClick = () => {
		if (onClick) {
			onClick(newsItem);
		}
	};

	return (
		<div className={styles.newsCard} onClick={handleClick}>
			<div className={styles.newsImageContainer}>
				<img alt={newsItem.title} className={styles.newsImage} src={newsItem.image} />
				<div className={styles.darkOverlay} />
				<div className={styles.iconOverlay}>
					{newsItem.isLink ? (
						<IconLink className={styles.overlayIcon} size={32} />
					) : (
						<IconFileDownload className={styles.overlayIcon} size={32} />
					)}
				</div>
			</div>
			<div className={styles.newsContent}>
				<div className={styles.newsMetadata}>
					<span className={styles.newsDate}>
						{showTopic ? `${newsItem.date} | ${newsItem.topic}` : newsItem.date}
					</span>
				</div>
				<h3 className={styles.newsTitle}>{newsItem.title}</h3>
			</div>
		</div>
	);
}
