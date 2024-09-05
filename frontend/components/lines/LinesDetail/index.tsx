'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import FavoriteToggle from '@/components/common/FavoriteToggle';
import Section from '@/components/layout/Section';
import LineBadge from '@/components/lines/LineBadge';
import LineName from '@/components/lines/LineName';
import Metrics from '@/components/lines/Metrics';
import SingleToolbar from '@/components/lines/SingleToolbar';
import StopsAndMapGrid from '@/components/lines/StopsAndMapGrid';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useProfileContext } from '@/contexts/Profile.context';
import toast from '@/utils/toast';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesDetail');
	const profileContext = useProfileContext();
	const linesDetailContext = useLinesDetailContext();

	//
	// B. Handle actions

	const handleToggleFavorite = async () => {
		if (!linesDetailContext.data.line) return;
		try {
			await profileContext.actions.toggleFavoriteLine(linesDetailContext.data.line.line_id);
		}
		catch (error) {
			toast.error({ message: t('toggle_favorite_error', { error: error.message }) });
		}
	};

	//
	// C. Render components

	if (!linesDetailContext.data.line) {
		return <Section withTopBorder={false} backRouter withChildrenPadding />;
	}

	return (
		<>
			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopBorder={false} backRouter withChildrenPadding>
				<div className={styles.headingSectionRow}>
					<LineBadge line={linesDetailContext.data.line} size="lg" />
					<FavoriteToggle color={linesDetailContext.data.line.color} isActive={linesDetailContext.flags.is_favorite} onToggle={handleToggleFavorite} />
				</div>
				<LineName line={linesDetailContext.data.line} size="lg" />
			</Section>

			<SingleToolbar />

			{linesDetailContext.data.active_alerts && linesDetailContext.data.active_alerts?.length > 0 && (
				<AlertsCarousel alerts={linesDetailContext.data.active_alerts} />
			)}

			<StopsAndMapGrid />

			{linesDetailContext.data.demand && (
				<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
					<Metrics />
				</Section>
			)}

		</>
	);

	//
}
