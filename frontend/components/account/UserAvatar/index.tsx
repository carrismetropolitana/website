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

interface Props {
	component?: 'button' | 'div'
	onClick?: () => void
	withName?: boolean
}

/* * */

export default function Component({ component = 'div', onClick, withName = false }: Props) {
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

			const avatar = profileContext.data.profile?.avatar;
			const device_id = profileContext.data.profile?.devices && profileContext.data.profile?.devices.length > 0
				? profileContext.data.profile.devices[0]?.device_id
				: undefined;

			setAvatarConfig(() => genConfig(avatar || device_id));
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
		if (profileContext.flags.is_loading || !profile || (!profile.first_name && !profile.last_name)) {
			return <>{t('Page.field.default_first_name')} {t('Page.field.default_last_name')}</>;
		}

		return <>{profile.first_name} {profile.last_name}</>;
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
