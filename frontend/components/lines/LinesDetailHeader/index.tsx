'use client';

/* * */

import FavoriteToggle from '@/components/common/FavoriteToggle';
import { SelectOperationalDay } from '@/components/common/SelectOperationalDay';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import LineBadge from '@/components/lines/LineBadge';
import SelectActivePatternGroup from '@/components/lines/SelectActivePatternGroup';
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
		return null;
	}

	return (
		<Surface>

			<Section withBottomDivider withPadding>
				<div className={styles.headingSection}>
					<div className={styles.headingSectionRow}>
						<LineBadge line={linesDetailContext.data.line} size="lg" />
						<FavoriteToggle color={linesDetailContext.data.line.color} isActive={linesDetailContext.flags.is_favorite} onToggle={handleToggleFavorite} />
					</div>
					<div className={styles.lineName}>
						{linesDetailContext.data.line.long_name}
					</div>
				</div>
			</Section>

			<Section withPadding>
				{/* <div className={styles.patternSelectorExplainerWrapper}>
					<SelectActivePatternGroupExplainer />
				</div> */}
				<div className={styles.container}>
					<div className={styles.operationalDaySelectorWrapper}>
						<SelectOperationalDay />
					</div>
					<div className={styles.patternSelectorWrapper}>
						<SelectActivePatternGroup />
					</div>
				</div>
			</Section>

		</Surface>
	);

	//
}
