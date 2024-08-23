import { useProfileContext } from '@/contexts/Profile.context';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface UseMergedDevicesResult {
	error: boolean
	loading: boolean
	message: null | string
}

const useMergedDevices = (): UseMergedDevicesResult => {
	//
	// A. Setup variables
	const profileContext = useProfileContext();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const t = useTranslations('AppError');

	const [loading, setLoading] = useState<UseMergedDevicesResult['loading']>(true);
	const [error, seterror] = useState<UseMergedDevicesResult['error']>(false);
	const [message, setMessage] = useState<UseMergedDevicesResult['message']>(null);

	//
	// B. Transform data

	useEffect(() => {
		const postMergedDevices = async () => {
			setLoading(true);

			try {
				const res = await fetch(`/api/accounts/${profileContext.data.device_id}/add-device`, {
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					method: 'POST',
				});

				const json = await res.json();

				console.log(res);
				console.log(json);

				seterror(!res.ok);
				setMessage(json.message);
			}
			catch (error) {
				seterror(true);
				setMessage(t('sync'));
			}
			finally {
				setLoading(false);
			}
		};

		if (!token) {
			seterror(true);
			setLoading(false);
			setMessage(t('token'));
			return;
		}

		if (token && profileContext.data.device_id) {
			postMergedDevices();
		}
	}, [profileContext.data.device_id, token]);

	return {
		error,
		loading,
		message,
	};
};

export default useMergedDevices;
