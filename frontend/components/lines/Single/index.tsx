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
import { useLinesSingleContext } from '@/contexts/LinesSingle.context';
import { useProfileContext } from '@/contexts/Profile.context';
import toast from '@/utils/toast';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations();
	const profileContext = useProfileContext();
	const linesSingleContext = useLinesSingleContext();

	//
	// B. Handle actions

	const handleToggleFavorite = async () => {
		if (!linesSingleContext.data.line) return;
		try {
			await profileContext.actions.toggleFavoriteLine(linesSingleContext.data.line.line_id);
		}
		catch (error) {
			toast.error({ message: t('toast.toggle_favorite_error', { error: error.message }) });
		}
	};

	//
	// C. Render components

	if (!linesSingleContext.data.line) {
		return <Section withTopBorder={false} backRouter withChildrenPadding />;
	}

	return (
		<>
			<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopBorder={false} backRouter withChildrenPadding>
				<div className={styles.headingSectionRow}>
					<LineBadge line={linesSingleContext.data.line} size="lg" />
					<FavoriteToggle color={linesSingleContext.data.line.color} isActive={linesSingleContext.flags.is_favorite} onToggle={handleToggleFavorite} />
				</div>
				<LineName line={linesSingleContext.data.line} size="lg" />
			</Section>

			<SingleToolbar />

			{linesSingleContext.data.active_alerts && linesSingleContext.data.active_alerts?.length > 0 && (
				<AlertsCarousel alerts={linesSingleContext.data.active_alerts} />
			)}

			<StopsAndMapGrid />

			{linesSingleContext.data.demand && (
				<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
					<Metrics />
				</Section>
			)}

		</>
	);

	//
}
