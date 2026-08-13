/* * */

'use client';

/* * */

import type { MergedArrival } from '@/contexts/PipsArrivals.context';
import type { ArrivalStatus } from '@/types/stops.types';

import { LineDisplay } from '@/components/lines/LineDisplay';
import { useLinesContext } from '@/contexts/Lines.context';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import { PipsArrivalsTableTimeCell } from './PipsArrivalsTableTimeCell';

/* * */

interface Props {
	arrival: MergedArrival
	index: number
	nowInSeconds: number
}

type TranslationFn = ReturnType<typeof useTranslations>;

function titleCaseFromEnum(value: string) {
	return value
		.split('_')
		.filter(Boolean)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

function translateOrFallback(
	t: TranslationFn,
	key: string,
	values: Record<string, unknown> | undefined,
	fallback: string,
) {
	const has = (t as unknown as { has?: (k: string) => boolean }).has;
	if (has && !has(key)) return fallback;

	try {
		return (t as unknown as (k: string, v?: Record<string, unknown>) => string)(key, values);
	}
	catch {
		return fallback;
	}
}

/* * */

export function PipsArrivalsTableRow({ arrival, index, nowInSeconds }: Props) {
	const linesContext = useLinesContext();
	const tCauseEffect = useTranslations('alerts.AlertCauseEffectIcon');
	const tWarningLabel = useTranslations('alerts.AlertCauseEffectLabel');

	const lineData = linesContext.actions.getLineDataById(arrival.line_id);
	const arrivalUnix = arrival.estimated_arrival_unix ?? arrival.scheduled_arrival_unix;
	const status: ArrivalStatus = arrival.estimated_arrival_unix !== null ? 'realtime' : 'scheduled';
	const hasWarnings = arrival.warnings.length > 0;
	const rowClassName = `${index % 2 === 0 ? styles.rowEven : styles.rowOdd} ${hasWarnings ? styles.rowWithWarningsTop : ''}`;

	return (
		<>
			<tr className={rowClassName}>
				<td className={styles.td}>
					<div className={styles.timeCell}>
						<PipsArrivalsTableTimeCell
							arrivalUnix={arrivalUnix}
							nowInSeconds={nowInSeconds}
							status={status}
						/>
					</div>
				</td>
				<td className={styles.td}>
					<div className={styles.lineCell}>
						{lineData && <LineDisplay color={lineData.color} longName={arrival.headsign} shortName={lineData.short_name} size="lg" textColor={lineData.text_color} />}
					</div>
				</td>
				<td className={styles.td}>
					<div className={styles.stopCell}>
						<div className={styles.stopName}>{arrival.stop_long_name}</div>
					</div>
				</td>
			</tr>
			{hasWarnings && (
				<tr className={`${styles.warningsRow} ${styles.rowWithWarningsBottom}`}>
					<td className={styles.warningsRowTd} colSpan={3}>
						<div className={styles.warningsRowInner}>
							<div className={styles.warnings}>
								{arrival.warnings.map(warning => (
									<div key={`${warning.effect}|${warning.cause}`} className={styles.warning}>
										<IconAlertTriangle size={18} aria-hidden />

										{(() => {
											const causeKey = `cause.${warning.cause}`;
											const effectKey = `effect.${warning.effect}`;

											const causeText = translateOrFallback(
												tCauseEffect,
												causeKey,
												undefined,
												titleCaseFromEnum(String(warning.cause)),
											);
											const effectText = translateOrFallback(
												tCauseEffect,
												effectKey,
												undefined,
												titleCaseFromEnum(String(warning.effect)),
											);

											return translateOrFallback(
												tWarningLabel,
												'label',
												{ cause: causeText, effect: effectText },
												`${effectText} (${causeText})`,
											);
										})()}
									</div>
								))}
							</div>
						</div>
					</td>
				</tr>
			)}
		</>
	);
}
