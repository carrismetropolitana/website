'use client';

import Error from '@/components/add-device/Error';
import Loading from '@/components/add-device/Loading';
import Success from '@/components/add-device/Page';
import useMergedDevices from '@/hooks/useMergeDevices';
/* * */

export default function Page() {
	//
	// A. Setup variables
	const { error, loading, message } = useMergedDevices();

	//
	// B. Render components

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <Error message={message || ''} />;
	}

	return <Success />;
}
