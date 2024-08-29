import { mergeDevices } from '@/actions/account.actions';
import { useProfileContext } from '@/contexts/Profile.context';
import { ServerActionResult } from '@/types/actions.types';
import { IJwt } from '@/types/jwt.types';
import { Profile } from '@/types/profile.type';
import { verifyJWT } from '@/utils/jwt';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

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
	const t = useTranslations();

	const [loading, setLoading] = useState<UseMergedDevicesResult['loading']>(true);
	const [error, setError] = useState<UseMergedDevicesResult['error']>(false);
	const [message, setMessage] = useState<UseMergedDevicesResult['message']>(null);

	const hasCalledPostMergedDevices = useRef(false);

	//
	// B. Transform data

	useEffect(() => {
		const postMergedDevices = async () => {
			setLoading(true);

			try {
				const decoded = await verifyJWT<IJwt>(token as string);

				if (!decoded) {
					setError(true);
					setMessage(t('AppError.unauthorized'));
					return;
				}

				const res: ServerActionResult<Profile> = await mergeDevices(profileContext.data.device_id, decoded.device_id);

				if (!res.success) {
					setError(true);
					setMessage(res.error);
					return;
				}

				setMessage(t('Profile.sync.success'));
			}
			catch (error) {
				setError(true);
				setMessage(t('AppError.sync'));
			}
			finally {
				setLoading(false);
			}
		};

		if (!token) {
			setError(true);
			setLoading(false);
			setMessage(t('token'));
			return;
		}

		if (token && profileContext.data.device_id && !hasCalledPostMergedDevices.current) {
			postMergedDevices();
			hasCalledPostMergedDevices.current = true; // Mark as called
		}
	}, [profileContext.data.device_id, token]);

	return {
		error,
		loading,
		message,
	};
};

export default useMergedDevices;
