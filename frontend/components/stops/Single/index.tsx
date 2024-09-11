'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import CopyBadge from '@/components/common/CopyBadge';
import FacilityIcon from '@/components/common/FacilityIcon';
import FavoriteToggle from '@/components/common/FavoriteToggle';
import SelectOperationalDay from '@/components/common/SelectOperationalDay';
import Section from '@/components/layout/Section';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { formatLocation } from '@/utils/formatLocation';
import toast from '@/utils/toast';
import { IconVolume } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import LinesHeader from '../LinesHeader';
import NextBuses from '../NextBuses';
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
			toast.error({ message: t('toast.toggle_favorite_error', { error: error.message }) });
		}
	};

	const playAudio = useCallback(() => {
		if (!currentStop) return;
		const audio = new Audio('https://storage.carrismetropolitana.pt/static/tts/live/stops/' + currentStop.id + '.mp3');
		audio.play();
	}, [currentStop]);

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
					<IconVolume className={styles.volumeIcon} onClick={playAudio} size={24} />
					<FavoriteToggle classNames={styles.favoriteIcon} color="var(--color-brand)" isActive={stopsSingleContext.flags.is_favorite} onToggle={handleToggleFavorite} />
				</span>
				<span className={styles.stopLocation}>
					{formatLocation([currentStop.locality, currentStop.municipality_name, currentStop.district_name])}
				</span>
				<div className={styles.badges}>
					{currentStop.facilities.map(facility => (
						<FacilityIcon key={facility} name={facility} />))}
				</div>
			</Section>

			{stopsSingleContext.data.active_alerts && stopsSingleContext.data.active_alerts?.length > 0 && (
				<AlertsCarousel alerts={stopsSingleContext.data.active_alerts} />
			)}
			<Section withTopPadding={false} withChildrenPadding withGap>
				<LinesHeader />
			</Section>
			<StopMap />
			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
				<SelectOperationalDay />
			</Section>

			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
				<NextBuses />
			</Section>

		</>
	);

	//
}
