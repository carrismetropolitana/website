'use client';

/* * */

import FavoriteToggle from '@/components/common/FavoriteToggle';
import Section from '@/components/layout/Section';
import LineBadge from '@/components/lines/LineBadge';
import LineName from '@/components/lines/LineName';
import { useLinesSingleContext } from '@/contexts/LinesSingle.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.Single');

	const profileContext = useProfileContext();
	const linesSingleContext = useLinesSingleContext();

	//
	// B. Fetch data

	// const allLinePatternsData = linesContext.actions.getLinePatternsDataByLineId(lineId);

	//
	// C. Transform data

	// const dayString = dayjs(date).format('YYYYMMDD');
	// const validPatternGroupsSelectOptions = allLinePatternsData?.find(pattern => pattern.find(patternGroup => patternGroup.valid_on.includes(dayString))) || null;

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
			{/* <Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
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
			</Section> */}
		</>
	);

	//
}
