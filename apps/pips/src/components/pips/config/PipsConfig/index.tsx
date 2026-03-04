'use client';

import { Loader } from '@/components/common/Loader';
import { SelectStops } from '@/components/common/SelectStops';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useStopsContext } from '@/contexts/Stops.context';
import { type PipsDisplayOrientation, type PipsDisplayRotation, useStopsPipContext } from '@/contexts/StopsPip.context';
import { Button, CopyButton, NumberInput, SegmentedControl, TextInput } from '@mantine/core';
import { IconLink, IconZoomScan } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import styles from './styles.module.css';

export function PipsConfig() {
	//

	//
	// A. Setup variables

	const t = useTranslations('Pips');

	const stopsPipContext = useStopsPipContext();
	const stopsContext = useStopsContext();

	const [selectedStopIds, setSelectedStopIds] = useState<string[]>([]);
	const [pipId, setPipId] = useState('');
	const [scale, setScale] = useState('1.0');
	const [orientation, setOrientation] = useState<PipsDisplayOrientation>(stopsPipContext.display.orientation);
	const [rotation, setRotation] = useState<PipsDisplayRotation>(stopsPipContext.display.rotation);

	//
	// B. Transform data

	const constructedUrl = useMemo(() => {
		if (typeof window === 'undefined') return '';

		const params = new URLSearchParams();

		if (selectedStopIds.length > 0) {
			params.set('stop_ids', selectedStopIds.join(','));
		}
		if (pipId.trim().length > 0) {
			params.set('pip_id', pipId.trim());
		}
		if (scale !== '1.0') {
			params.set('scale', scale);
		}
		if (orientation === 'vertical') {
			params.set('orientation', 'vertical');
			params.set('rotation', rotation);
		}

		return `${window.location.origin}/pips${params.toString() ? `?${params.toString()}` : ''}`;
	}, [selectedStopIds, pipId, scale, orientation, rotation]);

	const isButtonDisabled = useMemo(() => selectedStopIds.length === 0, [selectedStopIds]);

	//
	// C. Handle actions

	const handleSelectStopIds = useCallback((ids: string[]) => {
		setSelectedStopIds(ids);
	}, []);

	const handleChangePipId = useCallback((value: string) => {
		setPipId(value);
	}, []);

	const handleChangeScale = useCallback((value: number | string) => {
		setScale(value ? String(value) : '1.0');
	}, []);

	const handleChangeOrientation = useCallback((value: string) => {
		setOrientation(value === 'vertical' ? 'vertical' : 'landscape');
	}, []);

	const handleChangeRotation = useCallback((value: string) => {
		setRotation(value === 'ccw' ? 'ccw' : 'cw');
	}, []);

	const stopsSelect = useMemo(() => (
		<SelectStops
			data={stopsContext.data.stops}
			label="Paragens"
			onSelectStopIds={handleSelectStopIds}
			selectedStopIds={selectedStopIds}
		/>
	), [handleSelectStopIds, selectedStopIds, stopsContext.data.stops]);

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
					<Section withGap>
						{stopsSelect}

						<Grid columns="ab" withGap>
							<TextInput
								description="Identificador do PIP (ex: 504)"
								label="PIP ID"
								onChange={event => handleChangePipId(event.currentTarget.value)}
								placeholder="504"
								size="md"
								value={pipId}
							/>

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
						</Grid>

						<Grid columns="ab" withGap>
							<div>
								<div style={{ fontWeight: 600, marginBottom: 6 }}>Orientação</div>
								<SegmentedControl
									fullWidth={true}
									onChange={handleChangeOrientation}
									value={orientation}
									data={[
										{ label: 'Horizontal', value: 'landscape' },
										{ label: 'Vertical', value: 'vertical' },
									]}
								/>
							</div>

							<div>
								<div style={{ fontWeight: 600, marginBottom: 6 }}>Rotação</div>
								<SegmentedControl
									disabled={orientation !== 'vertical'}
									fullWidth={true}
									onChange={handleChangeRotation}
									value={rotation}
									data={[
										{ label: '↻ (cw)', value: 'cw' },
										{ label: '↺ (ccw)', value: 'ccw' },
									]}
								/>
							</div>
						</Grid>
					</Section>

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
