'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import FavoriteToggle from '@/components/common/FavoriteToggle';
import SelectOperationalDay from '@/components/common/SelectOperationalDay';
import NoDataLabel from '@/components/layout/NoDataLabel';
import Section from '@/components/layout/Section';
import LineBadge from '@/components/lines/LineBadge';
import LineName from '@/components/lines/LineName';
import SelectActivePatternGroup from '@/components/lines/SelectActivePatternGroup';
import { useLinesSingleContext } from '@/contexts/LinesSingle.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.Single');

	const profileContext = useProfileContext();
	const operationalDayContext = useOperationalDayContext();
	const linesSingleContext = useLinesSingleContext();

	//
	// B. Fetch data

	// const allLinePatternsData = linesContext.actions.getLinePatternsDataByLineId(lineId);

	//
	// C. Transform data

	const validPatternGroupsSelectOptions = useMemo(() => {
		if (!linesSingleContext.data.valid_pattern_groups) return [];
		return linesSingleContext.data.valid_pattern_groups.map(patternGroupData => ({ label: patternGroupData.headsign || '-', value: patternGroupData.pattern_group_id }));
	}, [linesSingleContext.data.valid_pattern_groups]);

	// const dayString = dayjs(date).format('YYYYMMDD');
	// const validPatternGroupsSelectOpions = allLinePatternsData?.find(pattern => pattern.find(patternGroup => patternGroup.valid_on.includes(dayString))) || null;

	// const selectedPattern = currentPatterns.find(pat => pat.pattern_id === patternId);

	// const alerts = useSWR<AlertDTO>('https://api.carrismetropolitana.pt/alerts').data;
	// const relevantAlerts = alerts?.entity.filter(entity => entity.alert.informedEntity.some(informedEntity => lineInfo.routes.includes(informedEntity.routeId ?? '')));

	// const metrics = useSWR<DemandByLine[]>('https://api.carrismetropolitana.pt/v2/metrics/demand/by_line').data;
	// const relevantDemand = metrics?.find(metric => metric.line_id === lineInfo.id);

	//
	// D. Handle actions

	const handleToggleFavorite = () => {
		if (!linesSingleContext.data.line) return;
		profileContext.actions.toggleFavoriteLine(linesSingleContext.data.line.line_id);
	};

	//
	// E. Render components

	if (!linesSingleContext.data.line) {
		return <Section backButtonHref="/lines" withTopBorder={false} withChildrenPadding />;
	}

	return (
		<>
			<Section backButtonHref="/lines" childrenWrapperStyles={styles.headingSection} withGap={false} withTopBorder={false} withChildrenPadding>
				<div className={styles.headingSectionRow}>
					<LineBadge line={linesSingleContext.data.line} size="lg" />
					<FavoriteToggle color={linesSingleContext.data.line.color} isActive={linesSingleContext.flags.is_favorite} onToggle={handleToggleFavorite} />
				</div>
				<LineName line={linesSingleContext.data.line} size="lg" />
			</Section>

			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
				<SelectOperationalDay />
				<SelectActivePatternGroup />
			</Section>

			{linesSingleContext.data.active_alerts && linesSingleContext.data.active_alerts?.length > 0 && (
				<AlertsCarousel alerts={linesSingleContext.data.active_alerts} />
			)}

			{ linesSingleContext.data.active_pattern_group ? (
				<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
					some
				</Section>
			) : (
				<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
					<NoDataLabel text="selecione um pattern" />
				</Section>
			) }

		</>
	);

	//
}
