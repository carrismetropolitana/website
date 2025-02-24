/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { ImagesCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export interface Props {
	description: string
	imageUrl: string
	title: string
	url: string
}

/* * */

export function PlannerCard({ description, imageUrl, title, url }: Props) {
	//

	//
	// A. Setup variables

	const analyticsContext = useAnalyticsContext();

	//
	// B. Handle Actions

	const handlePartnerCardClick = () => {
		analyticsContext.actions.capture(ampli => ampli.plannerUsed({ planner_clicked: title }));
	};

	//
	return (
		<Link className={styles.container} href={url} onClick={handlePartnerCardClick} target="_blank">
			<Image alt={title} className={styles.coverImage} fallbackSrc={ImagesCommon.PLACEHOLDER} src={imageUrl} />
			<div className={styles.content}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.description}>{description}</p>
			</div>
		</Link>
	);
}
