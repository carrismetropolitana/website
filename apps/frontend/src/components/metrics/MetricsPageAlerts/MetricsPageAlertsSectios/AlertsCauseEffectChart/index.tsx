import { AlertCause, AlertEffect } from '@/types/alerts.types';
import { BarChart } from '@mantine/charts';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

function enumerateEffectsBold(effects: string[]): React.ReactNode[] {
	if (effects.length === 0) return [];
	if (effects.length === 1) return [<b key={effects[0]}>{effects[0]}</b>];
	return effects.map((effect, idx) => {
		const isLast = idx === effects.length - 1;
		const isSecondLast = idx === effects.length - 2;
		return (
			<Fragment key={effect}>
				<b>{effect}</b>
				{!isLast && (isSecondLast ? ' e ' : ', ')}
			</Fragment>
		);
	});
}

/* * */

interface AlertsCauseEffectChartProps {
	data: {
		cause: AlertCause
		effects: { type: AlertEffect, value: number }[]
		total: number
	}[]
}

/* * */

export function AlertsCauseEffectChart({ data }: AlertsCauseEffectChartProps) {
	//
	// A. Setup variables
	const t = useTranslations('alerts');
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

	const effectsCauseData = data
		.slice()
		.sort((a, b) => b.total - a.total)
		.map(row => ({
			cause: t(`AlertCauseEffectIcon.cause.${row.cause}`),
			...row.effects.reduce((acc, effect) => ({ ...acc, [effect.type]: effect.value }), {}),
		}));

	const allEffects = Array.from(
		new Set(
			effectsCauseData.flatMap(row => Object.keys(row).filter(k => k !== 'cause')),
		),
	);

	const effectsCauseSeries = allEffects.map((effect, index) => ({
		color: barChartColors[index % barChartColors.length],
		data: effectsCauseData.map(row => row[effect] ?? 0),
		label: t(`AlertCauseEffectIcon.effect.${effect}_PLURAL`),
		name: effect,
	}));

	const mainCause = data.sort((a, b) => b.total - a.total)[0];
	const mainCauseLabel = t(`AlertCauseEffectIcon.cause.${mainCause.cause}`);
	const mainCauseCount = mainCause.total;

	const mainEffectsList = data
		.find(cause => cause.cause === mainCause.cause)?.effects
		.filter(effect => ![AlertEffect.NO_EFFECT, AlertEffect.OTHER_EFFECT, AlertEffect.UNKNOWN_EFFECT].includes(effect.type as AlertEffect))
		.sort((a, b) => b.value - a.value)
		.map(effect => t(`AlertCauseEffectIcon.effect.${effect.type}_PLURAL`)) ?? [];

	const mainEffectsBold = enumerateEffectsBold(mainEffectsList);

	//
	// C. Render components

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
			<p>Nos últimos dias, os passageiros foram mais afetados por <b>{mainCauseLabel}</b> ({mainCauseCount} ocorrências), que resultaram sobretudo em {mainEffectsBold}.</p>
		</>
	);
}
