'use client';

import { useProfileContext } from '@/contexts/Profile.context';
/* * */

import { generateJWT } from '@/utils/jwt';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('profile.sync');
	const profileContext = useProfileContext();
	const [qrCodeValue, setQrCodeValue] = useState('');

	//
	// B. Transform data
	useEffect(() => {
		const updateQrCode = async () => {
			const url = await buildUrl();
			setQrCodeValue(url);
		};

		updateQrCode(); // Initial call

		const intervalId = setInterval(updateQrCode, 1000 * 60 * 4); // Update every 4 minutes

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, [profileContext.data.device_id]);

	const buildUrl = async () => {
		const payload = {
			data: {
				device_id: profileContext.data.device_id,
			},
		};
		const jwt = await generateJWT(payload);
		const url = window.location.origin + '/add-device?token=' + jwt;
		return url;
	};
	//
	// C. Render components

	return (
		<div className={styles.container}>
			<h3>{t('heading')}</h3>
			<QRCode className={styles.qrCode} value={qrCodeValue} />
		</div>
	);

	//
}
