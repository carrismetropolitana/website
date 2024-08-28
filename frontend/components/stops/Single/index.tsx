'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import CopyBadge from '@/components/common/CopyBadge';
import FavoriteToggle from '@/components/common/FavoriteToggle';
import SelectOperationalDay from '@/components/common/SelectOperationalDay';
import NoDataLabel from '@/components/layout/NoDataLabel';
import Section from '@/components/layout/Section';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { IconVolume } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

import StopMap from '../StopMap';
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
	const currentStop = stopsSingleContext.data.stop;

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
		try {
			profileContext.actions.toggleFavoriteStop(stopsSingleContext.data.stop.id);
		}
		catch (error) {
			toast.error('Ocorreu um erro ao adicionar o paragem aos favoritos');
		}
	};

	//
	// E. Render components

	if (!currentStop) {
		return <Section withTopBorder={false} backRouter withChildrenPadding />;
	}

	return (
		<>
			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopBorder={false} backRouter withChildrenPadding>
				<div className={styles.badges}>
					<CopyBadge label={'#' + currentStop.id} value={currentStop.id} />
					<CopyBadge
						hasBorder={false}
						label={currentStop.lat + ' ' + currentStop.lon}
						value={currentStop.lat + '\t' + currentStop.lon}
					/>
				</div>
				<span className={styles.headingTitle}>
					{currentStop.name}
					<IconVolume className={styles.icon} size={24} />
					<FavoriteToggle color="var(--color-brand)" isActive={stopsSingleContext.flags.is_favorite} onToggle={handleToggleFavorite} />
				</span>
			</Section>

			{stopsSingleContext.data.active_alerts && stopsSingleContext.data.active_alerts?.length > 0 && (
				<AlertsCarousel alerts={stopsSingleContext.data.active_alerts} />
			)}
			<StopMap />
			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
				<SelectOperationalDay />
			</Section>

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
