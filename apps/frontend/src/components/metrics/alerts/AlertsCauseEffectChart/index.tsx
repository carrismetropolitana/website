import { AlertEffect } from '@/types/alerts.types';
import { AlertsCauseEffect as AlertsCauseEffectType } from '@carrismetropolitana/api-types/metrics';
import { BarChart } from '@mantine/charts';
import { Skeleton } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Fragment, useMemo } from 'react';

/* * */

/**
 * Helper to enumerate effects with bold tags and proper commas and "and" before the last item.
 */

function enumerateEffectsBold(effects: string[], t): React.ReactNode[] {
	if (effects.length === 0) return [];
	if (effects.length === 1) return [<b key={effects[0]}>{effects[0]}</b>];
	return effects.map((effect, idx) => {
		const isLast = idx === effects.length - 1;
		const isSecondLast = idx === effects.length - 2;
		return (
			<Fragment key={effect}>
				<b>{effect}</b>
				{!isLast && (isSecondLast ? ` ${t('causeEffectChart.and')} ` : ', ')}
			</Fragment>
		);
	});
}

/* * */

export function AlertsCauseEffectChart({ data }: { data?: AlertsCauseEffectType[] }) {
	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageAlerts');
	const barChartColors = [
		'#FFE066',
		'#FDB71A',
		'#FF9F1C',
		'#FF6B35',
		'#E63946',
		'#D62828',
		'#BA274A',
		'#9C1F4D',
		'#78290F',
		'#5A1A01',
		'#3D0C02',
	];

	//
	// B. Transform data

	const effectsCauseData = useMemo(() => {
		if (!data) return [];

		return data
			.slice()
			.sort((a, b) => b.total - a.total)
			.map(row => ({
				cause: t(`pluralCauses.${row.cause}`),
				...row.effects.reduce((acc, effect) => ({ ...acc, [effect.type]: effect.value }), {}),
			}));
	}, [data, t]);

	const allEffects = useMemo(() => {
		if (!effectsCauseData.length) return [];
		return Array.from(
			new Set(
				effectsCauseData.flatMap(row => Object.keys(row).filter(k => k !== 'cause')),
			),
		);
	}, [effectsCauseData]);

	const effectsCauseSeries = useMemo(() => {
		return allEffects.map((effect, index) => ({
			color: barChartColors[index % barChartColors.length],
			data: effectsCauseData.map(row => row[effect] ?? 0),
			label: t(`pluralEffects.${effect}`),
			name: effect,
		}));
	}, [allEffects, effectsCauseData, t, barChartColors]);

	const mainCause = useMemo(() => {
		if (!data || !Array.isArray(data) || data.length === 0) return undefined;
		return data.slice().sort((a, b) => b.total - a.total)[0];
	}, [data]);

	const mainCauseLabel = useMemo(() => (
		mainCause ? t(`pluralCauses.${mainCause.cause}`) : ''
	), [mainCause, t]);

	const mainCauseCount = useMemo(() => (
		mainCause?.total ?? 0
	), [mainCause]);

	const mainEffectsList = useMemo(() => (
		mainCause
			? mainCause.effects
				.filter(effect => ![AlertEffect.NO_EFFECT, AlertEffect.OTHER_EFFECT, AlertEffect.UNKNOWN_EFFECT].includes(effect.type as AlertEffect))
				.sort((a, b) => b.value - a.value)
				.map(effect => t(`pluralEffects.${effect.type}`))
			: []
	), [mainCause, t]);

	const mainEffectsBold = enumerateEffectsBold(mainEffectsList, t);

	//
	// C. Render components

	if (!data) {
		return (
			<>
				<Skeleton height={200} radius="md" />
				<Skeleton height={24} mt="md" width="80%" />
			</>
		);
	}

	return (
		<>
			<BarChart
				data={effectsCauseData}
				dataKey="cause"
				gridAxis="none"
				h={200}
				legendProps={{ verticalAlign: 'bottom' }}
				series={effectsCauseSeries}
				type="stacked"
			/>
			<p>{t('causeEffectChart.description_1')} <b>{mainCauseLabel}</b> ({mainCauseCount} {t('causeEffectChart.description_2')}), {t('causeEffectChart.description_3')} {mainEffectsBold}.</p>
		</>
	);
}
