'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Button, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

/* * */

export function AppDeleteAccount() {
	//

	//
	// A. Setup variables

	const t = useTranslations('app.AppDeleteAccount');

	const [isLoading, setIsLoading] = useState(false);

	const [emailAddressValue, setEmailAddressValue] = useState('');
	const [phoneNumberValue, setPhoneNumberValue] = useState('');
	const [deviceIdValue, setDeviceIdValue] = useState('');

	const [deleteResult, setDeleteResult] = useState<'error' | 'not_found' | 'success'>();

	//
	// B. Transform data

	const canSubmit = useMemo(() => {
		return emailAddressValue !== '' || phoneNumberValue !== '' || deviceIdValue !== '';
	}, [emailAddressValue, phoneNumberValue, deviceIdValue]);

	//
	// B. Handle actions

	const handleSubmit = async () => {
		try {
			if (!canSubmit) return;
			setIsLoading(true);
			let url = 'https://accounts.carrismetropolitana.pt/accounts?';
			if (emailAddressValue) url += `email=${encodeURIComponent(emailAddressValue)}&`;
			if (phoneNumberValue) url += `phone=${encodeURIComponent(phoneNumberValue)}&`;
			if (deviceIdValue) url += `device_id=${encodeURIComponent(deviceIdValue)}&`;
			const response = await fetch(url, { method: 'DELETE' });
			if (!response.ok && response.status === 404) setDeleteResult('not_found');
			else if (!response.ok) setDeleteResult('error');
			else setDeleteResult('success');
		}
		catch (error) {
			console.log(error);
			setDeleteResult('error');
		}
		finally {
			setIsLoading(false);
		}
	};

	//
	// C. Render components

	if (deleteResult) {
		return (
			<Surface>
				<Section heading={t('heading')} subheading={t('subheading')} withGap withPadding>
					<p>{t(`result.${deleteResult}.message`)}</p>
				</Section>
			</Surface>
		);
	}

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withGap withPadding>
				<TextInput onChange={e => setEmailAddressValue(e.currentTarget.value)} placeholder={t('fields.email.placeholder')} value={emailAddressValue} w="100%" />
				<p>{t('separator')}</p>
				<TextInput onChange={e => setPhoneNumberValue(e.currentTarget.value)} placeholder={t('fields.phone.placeholder')} value={phoneNumberValue} w="100%" />
				<p>{t('separator')}</p>
				<TextInput onChange={e => setDeviceIdValue(e.currentTarget.value)} placeholder={t('fields.device_id.placeholder')} value={deviceIdValue} w="100%" />
				<Button disabled={!canSubmit} loading={isLoading} onClick={handleSubmit} variant="danger">{t('actions.submit')}</Button>
			</Section>
		</Surface>
	);

	//
}
