'use client';

import { Loader } from '@/components/common/Loader';
import { SelectMaxLines } from '@/components/common/SelectMaxLines';
import { SelectStops } from '@/components/common/SelectStops';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useStopsContext } from '@/contexts/Stops.context';
import { useStopsPipContext } from '@/contexts/StopsPip.context';
import { Button, CopyButton, NumberInput, Switch } from '@mantine/core';
import { IconArrowsVertical, IconCircleNumber0, IconLink, IconZoomScan } from '@tabler/icons-react';
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
	const [autoScroll, setAutoScroll] = useState(false);
	const [scrollSpeed, setScrollSpeed] = useState('50');
	const [scrollPause, setScrollPause] = useState('2000');

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
		if (autoScroll) {
			params.set('auto_scroll', 'true');
		}
		if (scrollSpeed !== '50') {
			params.set('scroll_speed', scrollSpeed);
		}
		if (scrollPause !== '2000') {
			params.set('scroll_pause', scrollPause);
		}

		return `${window.location.origin}/pips${params.toString() ? `?${params.toString()}` : ''}`;
	}, [selectedStopIds, maxLines, scale, autoScroll, scrollSpeed, scrollPause]);

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

	const handleChangeAutoScroll = (checked: boolean) => {
		setAutoScroll(checked);
	};

	const handleChangeScrollSpeed = (value: number | string) => {
		setScrollSpeed(value ? String(value) : '50');
	};

	const handleChangeScrollPause = (value: number | string) => {
		setScrollPause(value ? String(value) : '2000');
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

						<div className={styles.switchWrapper}>
							<Switch
								checked={autoScroll}
								description="Ativa o scroll automático na página caso o conteúdo exceda a altura da janela"
								label="Auto Scroll"
								onChange={event => handleChangeAutoScroll(event.currentTarget.checked)}
								size="md"
							/>
						</div>

						{autoScroll && (
							<>
								<NumberInput
									autoComplete="off"
									description="Milissegundos entre passos (10-500ms)"
									label="Velocidade de Scroll"
									leftSection={<IconArrowsVertical size={20} />}
									max={500}
									min={10}
									onChange={handleChangeScrollSpeed}
									placeholder="10-500ms"
									size="md"
									value={scrollSpeed}
								/>

								<NumberInput
									autoComplete="off"
									description="Pausa no topo/fundo (500-10000ms)"
									label="Pausa de Scroll"
									leftSection={<IconCircleNumber0 size={20} />}
									max={10000}
									min={500}
									onChange={handleChangeScrollPause}
									placeholder="500-10000ms"
									size="md"
									value={scrollPause}
								/>
							</>
						)}

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
