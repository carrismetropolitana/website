'use client';
/* * */

import { StopProbeSection } from '@/components/stops/StopProbeSection';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

/* * */

export function StopProbe() {
	//

	//
	// A. Setup Variables
	const [selectedStop, setSelectedStop] = useState('');
	const t = useTranslations('stops.Probe');
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const url = window.location.href;
		setSelectedStop(url.split('/').pop() || '');
	}, []);

	//
	// B. Render Components

	return (
		<StopProbeSection description={t('description')} selectedStop={selectedStop || ''} title={t('title')} />
	);

	//
}
