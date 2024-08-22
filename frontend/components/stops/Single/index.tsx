'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import SelectOperationalDay from '@/components/common/SelectOperationalDay';
import NoDataLabel from '@/components/layout/NoDataLabel';
import Section from '@/components/layout/Section';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.Single');

	const profileContext = useProfileContext();
	const operationalDayContext = useOperationalDayContext();
	const stopsSingleContext = useStopsSingleContext();

	//
	// B. Fetch data

	// const allLinePatternsData = linesContext.actions.getLinePatternsDataByLineId(lineId);

	//
	// C. Transform data

	const validPatternGroupsSelectOptions = useMemo(() => {
		if (!stopsSingleContext.data.valid_pattern_groups) return [];
		return stopsSingleContext.data.valid_pattern_groups.map(patternGroupData => ({ label: patternGroupData.headsign || '-', value: patternGroupData.pattern_group_id }));
	}, [stopsSingleContext.data.valid_pattern_groups]);

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
		if (!stopsSingleContext.data.stop) return;
		profileContext.actions.toggleFavoriteStop(stopsSingleContext.data.stop.id);
	};

	//
	// E. Render components

	if (!stopsSingleContext.data.stop) {
		return <Section withTopBorder={false} backRouter withChildrenPadding />;
	}

	return (
		<>
			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopBorder={false} backRouter withChildrenPadding>
				{/* <div className={styles.headingSectionRow}>
					<LineBadge line={stopsSingleContext.data.line} size="lg" />
					<FavoriteToggle color={stopsSingleContext.data.line.color} isActive={stopsSingleContext.flags.is_favorite} onToggle={handleToggleFavorite} />
				</div>
				<LineName line={stopsSingleContext.data.line} size="lg" /> */}
			</Section>

			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
				<SelectOperationalDay />
			</Section>

			{stopsSingleContext.data.active_alerts && stopsSingleContext.data.active_alerts?.length > 0 && (
				<AlertsCarousel alerts={stopsSingleContext.data.active_alerts} />
			)}

			{ stopsSingleContext.data.active_pattern_group ? (
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
