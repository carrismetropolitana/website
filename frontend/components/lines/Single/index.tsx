'use client';

/* * */

import FavoriteToggle from '@/components/common/FavoriteToggle';
import ScheduleDrawer from '@/components/common/ScheduleDrawer';
import SelectDate from '@/components/common/SelectDate';
import Section from '@/components/layout/Section';
import LineBadge from '@/components/lines/LineBadge';
import LineName from '@/components/lines/LineName';
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

import { useLinesContext } from '@/contexts/lines.context';

import styles from './styles.module.css';

/* * */

export default function Component({ lineId }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.Single');

	const [date, setDate] = useState<Date>(new Date());
	const [patternId, setPatternId] = useState<null | string>(null);
	const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
	const [selectedStopSequence, setSelectedStopSequence] = useState<null | number>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const linesContext = useLinesContext();

	//
	// B. Fetch data

	const lineData = linesContext.actions.getLineById(lineId);
	const lineFavoriteStatus = linesContext.actions.getLineIdFavoriteStatus(lineId);

	// const patterns = lineInfo.patterns.map(pattern_id => ({
	// 	id: pattern_id,
	// 	pattern: useSWR<Pattern[]>('https://api.carrismetropolitana.pt/v2/patterns/' + pattern_id).data,
	// }));

	// const dayString = dayjs(date).format('YYYYMMDD');
	// const currentPatterns = patterns.map(p => p.pattern?.find(pat => pat.valid_on.includes(dayString))).filter(pat => pat != undefined);
	// const selectedPattern = currentPatterns.find(pat => pat.pattern_id === patternId);

	// const alerts = useSWR<AlertDTO>('https://api.carrismetropolitana.pt/alerts').data;
	// const relevantAlerts = alerts?.entity.filter(entity => entity.alert.informedEntity.some(informedEntity => lineInfo.routes.includes(informedEntity.routeId ?? '')));

	// const metrics = useSWR<DemandByLine[]>('https://api.carrismetropolitana.pt/v2/metrics/demand/by_line').data;
	// const relevantDemand = metrics?.find(metric => metric.line_id === lineInfo.id);

	// const { profile: { favoriteLines }, setFavoriteLines } = useProfileContext();

	// function onClickHeart() {
	// 	if (favoriteLines.includes(lineInfo.id)) {
	// 		setFavoriteLines(favoriteLines.filter(id => id !== lineInfo.id));
	// 	}
	// 	else {
	// 		setFavoriteLines([...favoriteLines, lineInfo.id]);
	// 	}
	// }

	//
	// B. Handle actions

	const handleToggleFavorite = () => {
		linesContext.actions.updateLineIdFavoriteStatus(lineId);
	};

	//
	// C. Render components

	if (!lineData) {
		return <Section backButtonHref="/lines" withTopBorder={false} withChildrenPadding />;
	}

	return (
		<>
			<Section backButtonHref="/lines" childrenWrapperStyles={styles.headingSection} withGap={false} withTopBorder={false} withChildrenPadding>
				<div className={styles.headingSectionRow}>
					<LineBadge line={lineData} size="lg" />
					<FavoriteToggle color={lineData.color} isActive={lineFavoriteStatus} onToggle={handleToggleFavorite} />
				</div>
				<LineName line={lineData} size="lg" />
			</Section>
			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withChildrenPadding>
				<SelectDate setDate={setDate} value={date} />
			</Section>
		</>
	);

	//
}
