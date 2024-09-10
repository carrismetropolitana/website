'use client';

/* * */

import Loader from '@/components/common/Loader';
import RegularListItem from '@/components/layout/RegularListItem';
import Section from '@/components/layout/Section';
import NotificationCard from '@/components/profile/notifications/NotificationCard';
import { useProfileContext } from '@/contexts/Profile.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//
	// A. Setup variables

	const t = useTranslations('notifications.Page');
	const profileContext = useProfileContext();

	//
	// B. Render components

	// Loading state
	if (profileContext.flags.is_loading) {
		return (
			<>
				<Section heading={t('heading')} withTopBorder={false} withGap>
					<div className={styles.container}>
						<Loader visible={profileContext.flags.is_loading} />
					</div>
				</Section>
			</>
		);
	}

	return (
		<>
			<Section heading={t('heading')} withTopBorder={false} withGap>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 20 }}>
					{profileContext.data.profile?.notifications.map(notification => (
						<RegularListItem key={notification._id} href={`/profile/notifications/${notification._id}`}>
							<NotificationCard notification={notification} />
						</RegularListItem>
					))}
				</div>
			</Section>
		</>
	);

	//
}
