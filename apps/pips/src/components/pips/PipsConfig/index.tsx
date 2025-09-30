'use client';

import { Loader } from '@/components/common/Loader';
import { SelectMaxLines } from '@/components/common/SelectMaxLines';
import { SelectStops } from '@/components/common/SelectStops';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useStopsContext } from '@/contexts/Stops.context';
import { useStopsPipContext } from '@/contexts/StopsPip.context';
import { Button, CopyButton } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import styles from './styles.module.css';

export function PipsConfig() {
	//

	//
	// A. Setup variables

	const t = useTranslations('Pips');

	const stopsPipContext = useStopsPipContext();
	const stopsContext = useStopsContext();

	const [selectedStopIds, setSelectedStopIds] = useState([]);
	const [maxLines, setMaxLines] = useState<number | string>('');

	//
	// B. Transform data

	const constructedUrl = useMemo(() => {
		if (typeof window === 'undefined') return '';

		const params = new URLSearchParams();

		if (selectedStopIds.length > 0) {
			params.set('stop_ids', selectedStopIds.join(','));
		}

		if (maxLines) {
			params.set('max_lines', String(maxLines));
		}
		const queryString = params.toString();
		return `${window.location.origin}/pips${queryString ? `?${queryString}` : ''}`;
	}, [selectedStopIds, maxLines]);

	const isButtonDisabled = useMemo(() => selectedStopIds.length === 0, [selectedStopIds]);

	//
	// C. Render components

	if (stopsPipContext.flags.is_loading) {
		return (
			<div className={styles.container}>
				<Loader visible />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Surface>
				<Section heading={t('section_heading')} />

				<div className={styles.filtersWrapper}>
					<div className={styles.inputsWrapper}>
						<SelectStops data={stopsContext.data.stops} onSelectStopIds={setSelectedStopIds} selectedStopIds={selectedStopIds} variant="white" />
						<SelectMaxLines maxLines={maxLines} onChangeMaxLines={setMaxLines} />

						<div className={styles.buttonsWrapper}>
							<Button component={Link} disabled={isButtonDisabled} href={constructedUrl} variant="primary">{t('go_to_pips')}</Button>
							<CopyButton value={constructedUrl}>
								{({ copied, copy }) => (
									<Button disabled={isButtonDisabled} leftSection={<IconLink size={20} />} onClick={copy}>
										{copied ? t('url_copied') : t('copy_url')}
									</Button>
								)}
							</CopyButton>
						</div>
					</div>
				</div>
			</Surface>
		</div>
	);
}
