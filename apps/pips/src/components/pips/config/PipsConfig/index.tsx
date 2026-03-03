'use client';

import { Loader } from '@/components/common/Loader';
import { SelectMaxLines } from '@/components/common/SelectMaxLines';
import { SelectStops } from '@/components/common/SelectStops';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useStopsContext } from '@/contexts/Stops.context';
import { useStopsPipContext } from '@/contexts/StopsPip.context';
import { Button, CopyButton, NumberInput } from '@mantine/core';
import { IconLink, IconZoomScan } from '@tabler/icons-react';
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

	const [selectedStopIds, setSelectedStopIds] = useState<string[]>([]);
	const [maxLines, setMaxLines] = useState('3');
	const [scale, setScale] = useState('1.0');

	//
	// B. Transform data

	const constructedUrl = useMemo(() => {
		if (typeof window === 'undefined') return '';

		const params = new URLSearchParams();

		if (selectedStopIds.length > 0) {
			params.set('stop_ids', selectedStopIds.join(','));
		}
		if (maxLines) {
			params.set('max_lines', maxLines);
		}
		if (scale !== '1.0') {
			params.set('scale', scale);
		}

		return `${window.location.origin}/pips${params.toString() ? `?${params.toString()}` : ''}`;
	}, [selectedStopIds, maxLines, scale]);

	const isButtonDisabled = useMemo(() => selectedStopIds.length === 0, [selectedStopIds]);

	const parsedStops = useMemo(() => {
		return stopsContext.data.stops.map(stop => ({
			label: stop.long_name,
			value: stop.id,
		}));
	}, [stopsContext.data.stops]);

	//
	// C. Handle actions

	const handleSelectStopIds = (ids: string[]) => {
		setSelectedStopIds(ids);
	};

	const handleChangeMaxLines = (value: number | string) => {
		setMaxLines(value ? String(value) : '');
	};

	const handleChangeScale = (value: number | string) => {
		setScale(value ? String(value) : '1.0');
	};

	//
	// D. Render components

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
					<div className={styles.mainInputsRow}>
						<div className={styles.stopsInput}>
							<SelectStops
								data={parsedStops}
								label="Paragens"
								onSelectStopIds={handleSelectStopIds}
								selectedStopIds={selectedStopIds}
							/>
						</div>

						<div className={styles.maxLinesInput}>
							<SelectMaxLines
								label="Número de circulações"
								maxLines={maxLines}
								onChangeMaxLines={handleChangeMaxLines}
							/>
						</div>
					</div>

					<div className={styles.displayConfigWrapper}>
						<NumberInput
							autoComplete="off"
							decimalScale={1}
							description="Fator de escala (0.5-3.0)"
							label="Fator de zoom da página"
							leftSection={<IconZoomScan size={20} />}
							max={3.0}
							min={0.5}
							onChange={handleChangeScale}
							placeholder="0.5 - 3.0"
							size="md"
							step={0.1}
							value={scale}
						/>

					</div>

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

			</Surface>
		</div>
	);
}
