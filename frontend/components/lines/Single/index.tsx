'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import FavoriteToggle from '@/components/common/FavoriteToggle';
import SelectOperationalDay from '@/components/common/SelectOperationalDay';
import NoDataLabel from '@/components/layout/NoDataLabel';
import Section from '@/components/layout/Section';
import DemandByLine from '@/components/lines/DemandByLine';
import LineBadge from '@/components/lines/LineBadge';
import LineMap from '@/components/lines/LineMap';
import LineName from '@/components/lines/LineName';
import SelectActivePatternGroup from '@/components/lines/SelectActivePatternGroup';
import { useLinesSingleContext } from '@/contexts/LinesSingle.context';
import { useProfileContext } from '@/contexts/Profile.context';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();
	const linesSingleContext = useLinesSingleContext();

	//
	// B. Handle actions

	const handleToggleFavorite = () => {
		if (!linesSingleContext.data.line) return;
		profileContext.actions.toggleFavoriteLine(linesSingleContext.data.line.line_id);
	};

	//
	// C. Render components

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

			{linesSingleContext.data.active_pattern_group ? (
				<Section withGap={false} withTopPadding={false} withChildrenPadding>
					<LineMap />
					{/* <StopList /> */}
				</Section>
			) : (
				<Section withGap={false} withTopPadding={false} withChildrenPadding>
					<NoDataLabel text="selecione um pattern" />
				</Section>
			)}

			{linesSingleContext.data.demand && (
				<DemandByLine />
			)}

		</>
	);

	//
}
