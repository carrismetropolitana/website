/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { ImagesCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';
import { IconCircleArrowUpRightFilled } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface AlertsListItemImageThumbnailProps {
	alertId: string
	alertTitle: string
	alt: string
	href: string
	src: string
	target?: string
}

/* * */

export default function Component({ alertId, alertTitle, alt, href, src, target }: AlertsListItemImageThumbnailProps) {
	//

	//

	// A. Setup Variables
	const analyticsContext = useAnalyticsContext();
	//

	// B. Handle actions
	const handleAlertDetailClick = () => {
		analyticsContext.actions.capture(ampli => ampli.alertClicked({ alert_id: alertId, alert_title: alertTitle || '' }));
	};
	//
	return (
		<Link className={styles.container} href={href} onClick={handleAlertDetailClick} target={target}>
			<IconCircleArrowUpRightFilled className={styles.icon} size={25} />
			<Image alt={alt} className={styles.image} fallbackSrc={ImagesCommon.PLACEHOLDER} src={src} />
		</Link>
	);
}
