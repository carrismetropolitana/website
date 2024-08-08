'use client';
import ScheduleDrawer from '@/components/common/ScheduleDrawer';
import SelectDate from '@/components/common/SelectDate';
import { useProfileContext } from '@/contexts/ProfileContext';
import { AlertDTO, DemandByLine, Line, Pattern, Stop } from '@/utils/types';
import { Select } from '@mantine/core';
import { IconArrowBarToRight, IconVolume, IconZoomQuestionFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import pt from 'dayjs/locale/pt';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import useSWR from 'swr';

import AlertCarousel from '../AlertCarousel';
import RouteMap from '../RouteMap';
import StopList from '../StopList';
dayjs.locale(pt);

import styles from './styles.module.css';

export default function Component({ lineInfo }: { lineInfo: Line }) {
	const [date, setDate] = useState<Date>(new Date());
	const [patternId, setPatternId] = useState<null | string>(null);
	const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
	const [selectedStopSequence, setSelectedStopSequence] = useState<null | number>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const patterns = lineInfo.patterns.map(pattern_id => ({
		id: pattern_id,
		pattern: useSWR<Pattern[]>('https://api.carrismetropolitana.pt/v2/patterns/' + pattern_id).data,
	}));
	const dayString = dayjs(date).format('YYYYMMDD');
	const currentPatterns = patterns.map(p => p.pattern?.find(pat => pat.valid_on.includes(dayString))).filter(pat => pat != undefined);
	const selectedPattern = currentPatterns.find(pat => pat.pattern_id === patternId);

	const alerts = useSWR<AlertDTO>('https://api.carrismetropolitana.pt/alerts').data;
	const relevantAlerts = alerts?.entity.filter(entity => entity.alert.informedEntity.some(informedEntity => lineInfo.routes.includes(informedEntity.routeId ?? '')));

	const metrics = useSWR<DemandByLine[]>('https://api.carrismetropolitana.pt/v2/metrics/demand/by_line').data;
	const relevantDemand = metrics?.find(metric => metric.line_id === lineInfo.id);

	const t = useTranslations('line');
	const { profile: { favoriteLines }, setFavoriteLines } = useProfileContext();

	function onClickHeart() {
		if (favoriteLines.includes(lineInfo.id)) {
			setFavoriteLines(favoriteLines.filter(id => id !== lineInfo.id));
		}
		else {
			setFavoriteLines([...favoriteLines, lineInfo.id]);
		}
	}

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.controls}>
				<SelectDate setDate={setDate} value={date} />
				<div className={styles.routeSelector}>
					<div className={styles.routeExplainer}>
						<IconZoomQuestionFilled size={14} />{t('route_explainer')}
					</div>
					<Select
						checkIconPosition="right"
						classNames={styles}
						data={currentPatterns.map(route => ({ disabled: route.pattern_id == undefined, label: route.headsign ? route.headsign : '', value: route.pattern_id }))}
						leftSection={<IconArrowBarToRight size={20} />}
						onChange={setPatternId}
						placeholder={t('pick_route')}
						rightSection={<IconVolume size={14} />}
						size="lg"
						value={patternId}
					/>
				</div>
			</div>
			<>
				<div>
					{ relevantAlerts !== undefined && relevantAlerts.length > 0
					&& (
						<div>
							<div className={styles.divisor} />
							<AlertCarousel alerts={relevantAlerts} />
						</div>
					)}
					{ selectedPattern
					&& (
						<>
							<div className={styles.divisor} />
							<RouteMap pattern={selectedPattern} />
							<div className={styles.mapAttribution}>
								<a href="https://maplibre.org/" target="_blank">MapLibre</a>
								<a href="https://www.openmaptiles.org/" target="_blank">© OpenMapTiles</a>
								<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>
							</div>
						</>
					)}
				</div>
				{ selectedPattern
				&& (
					<>
						<StopList
							date={date}
							pattern={selectedPattern}
							selectedStop={selectedStop}
							setDrawerOpen={setDrawerOpen}
							setSelectedStop={setSelectedStop}
							setSelectedStopSequence={setSelectedStopSequence}
						/>
						{ selectedStop && selectedStopSequence !== null
						&& (
							<ScheduleDrawer date={date} open={drawerOpen} pattern={selectedPattern} setOpen={setDrawerOpen} stop={selectedStop} stopSequence={selectedStopSequence} />
						)}
					</>
				)}
			</>
			{
				relevantDemand
				&& (
					<div className={styles.metrics}>
						<h1 style={{ color: lineInfo.color }}>{relevantDemand.total_qty}</h1>
						<h3>{t('num_passengers')}</h3>
					</div>
				)
			}
		</div>
	);
}
