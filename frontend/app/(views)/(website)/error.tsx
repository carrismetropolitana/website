'use client';

/* * */

import AppError from '@/components/common/AppError';

/* * */

export default function Error({ error }: { error: Error }) {
	return <AppError error={error} />;
}
