'use client';

/* * */

import { useProfileContext } from '@/contexts/Profile.context';
import { Profile } from '@/types/profile.type';
import { UnstyledButton } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';

import styles from './styles.module.css';

/* * */

export default function Component({ component = 'div', onClick = () => null, withName = false }) {
	//
	// A. Setup variables
	const t = useTranslations('profile');
	const profileContext = useProfileContext();
	const [profile, setProfile] = useState<Profile>(() => profileContext.data.profile || {} as Profile);
	const [avatarConfig, setAvatarConfig] = useState<typeof genConfig>(() => genConfig());

	//
	// B. Transform data
	useEffect(() => {
		if (profileContext.data.profile && !profileContext.flags.is_loading) {
			setProfile(profileContext.data.profile);
			setAvatarConfig(() => genConfig(profileContext.data.profile?.avatar || profileContext.data.profile?.devices[0]?.device_id));
		}
	}, [profileContext.data.profile]);

	//
	// C. Render components
	const renderAvatar = () => {
		if (profileContext.flags.is_loading || !profileContext.data.profile) {
			return <>🐙</>;
		}

		return (
			<Avatar
				style={{
					height: '100%',
					width: '100%',
				}}
				{...avatarConfig}
			/>
		);
	};

	const renderName = () => {
		if (profileContext.flags.is_loading || !profileContext.data.profile || (!profileContext.data.profile.first_name && !profileContext.data.profile.last_name)) {
			return <>{t('Page.field.default_first_name')} {t('Page.field.default_last_name')}</>;
		}

		return <>{profileContext.data.profile.first_name} {profileContext.data.profile.last_name}</>;
	};

	if (component === 'button') {
		return (
			<div className={`${styles.container} ${styles.asButton}`}>
				<UnstyledButton className={styles.userPic} onClick={onClick}>
					{ renderAvatar() }
				</UnstyledButton>
				{withName && <span className={styles.userName}>{renderName()}</span>}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.userPic}>{renderAvatar()}</div>
			{withName && <span className={styles.userName}>{renderName()}</span>}
		</div>
	);

	//
}
