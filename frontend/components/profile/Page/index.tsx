'use client';

/* * */

import Button from '@/components/common/Button';
import Input, { InputProps } from '@/components/common/Input';
import Section from '@/components/layout/Section';
import { useProfileContext } from '@/contexts/Profile.context';
import { Profile } from '@/types/profile.type';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import Loading from './loading';
import styles from './styles.module.css';

/* * */

interface ProfileInputProps extends InputProps {
	value_id: string
}

export default function Component() {
	//

	//
	// A. Setup variables
	const t = useTranslations();
	const profileContext = useProfileContext();
	const [profile, setProfile] = useState<Profile>(() => profileContext.data.profile || {} as Profile);
	const [avatarConfig, setAvatarConfig] = useState<typeof genConfig>(() => genConfig());

	const inputFields: ProfileInputProps[] = [
		{
			label: t('profile.Page.field.first_name'),
			onChange: event => updateProfileField({ first_name: event.currentTarget.value }),
			placeholder: t('profile.Page.field.default_first_name'),
			value_id: 'first_name',
		},
		{
			label: t('profile.Page.field.last_name'),
			onChange: event => updateProfileField({ last_name: event.currentTarget.value }),
			placeholder: t('profile.Page.field.default_last_name'),
			value_id: 'last_name',
		},
		{
			error: t('profile.Page.field.email_error'),
			label: t('profile.Page.field.email'),
			onChange: event => updateProfileField({ email: event.currentTarget.value }),
			placeholder: t('profile.Page.field.email'),
			tooltip: t('profile.Page.field.email_tooltip'),
			validation: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			value_id: 'email',
		},
	];

	//
	// B. Handle actions
	useEffect(() => {
		if (profileContext.data.profile) {
			setProfile(profileContext.data.profile);

			const avatar = profileContext.data.profile?.avatar;
			const device_id = profileContext.data.profile?.devices && profileContext.data.profile?.devices.length > 0
				? profileContext.data.profile.devices[0]?.device_id
				: undefined;

			setAvatarConfig(() => genConfig(avatar || device_id));
		}
	}, [profileContext.data.profile]);

	const updateProfileField = (profile: Partial<Profile>) => {
		setProfile(prevProfile => ({
			...prevProfile,
			...profile,
		}));
	};

	const generateAvatar = () => {
		const avatar = uuid();
		setAvatarConfig(() => genConfig(avatar));
		setProfile(prevProfile => ({ ...prevProfile, avatar }));
	};

	const handleSubmit = async () => {
		toast.promise(
			profileContext.actions.updateProfile(profile),
			{
				error: t('toast.update_profile_error'),
				pending: t('toast.update_profile_pending'),
				success: t('toast.update_profile_success'),
			},
		);
	};

	//
	// C. Render components

	if (!profileContext.data.profile) return <Loading />;

	return (
		<>
			<Section heading={t('profile.Page.heading')} withTopBorder={false} />
			<Section withTopBorder={false} withChildrenPadding>
				<div className={styles.avatar}>
					<Avatar style={{ height: '8rem', width: '8rem' }} {...avatarConfig} />
					<Button label={t('common.button.generate')} onClick={generateAvatar} variant="pill" />
				</div>
				<div className={styles.input__fields}>
					{inputFields.map((field, index) => (
						<Input key={index} {...field} value={profile[field.value_id]} />
					))}
				</div>
				<div className={styles.submit__container}>
					<Button className={styles.submit__button} label={t('common.button.save')} onClick={handleSubmit} variant="primary" />
				</div>
			</Section>
		</>
	);
}
