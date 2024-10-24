'use client';

/* * */

import CopyBadge from '@/components/common/CopyBadge';
import FavoriteToggle from '@/components/common/FavoriteToggle';
import { IconDisplay } from '@/components/common/IconDisplay';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import LineBadge from '@/components/lines/LineBadge';
import { StopDisplayLocation } from '@/components/stops/StopDisplayLocation';
import { StopDisplayName } from '@/components/stops/StopDisplayName';
import { StopDisplayTts } from '@/components/stops/StopDisplayTts';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import toast from '@/utils/toast';

import styles from './styles.module.css';

/* * */

export function StopsDetailHeader() {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();
	const stopsDetailContext = useStopsDetailContext();

	//
	// B. Handle actions

	const handleToggleFavorite = () => {
		if (!stopsDetailContext.data.stop) return;
		try {
			profileContext.actions.toggleFavoriteStop(stopsDetailContext.data.stop.id);
		}
		catch (error) {
			toast.error({ message: 'Error: ' + error.message });
		}
	};

	//
	// C. Render components

	if (!stopsDetailContext.data.stop) {
		return null;
	}

	return (
		<Surface>

			<Section withGap withPadding>

				<div className={styles.badgesWrapper}>
					<CopyBadge
						label={'#' + stopsDetailContext.data.stop.id}
						value={stopsDetailContext.data.stop.id}
					/>
					<CopyBadge
						hasBorder={false}
						label={`${stopsDetailContext.data.stop.lat}, ${stopsDetailContext.data.stop.lon}`}
						value={stopsDetailContext.data.stop.lat + '\t' + stopsDetailContext.data.stop.lon}
					/>
				</div>

				<div className={styles.headingWrapper}>
					<div className={styles.nameWrapper}>
						<StopDisplayName size="lg" stopName={stopsDetailContext.data.stop.name} />
						<StopDisplayTts stopId={stopsDetailContext.data.stop.id} />
						<FavoriteToggle color="var(--color-brand)" isActive={stopsDetailContext.flags.is_favorite} onToggle={handleToggleFavorite} />
					</div>
					<StopDisplayLocation locality={stopsDetailContext.data.stop.locality} municipalityName={stopsDetailContext.data.stop.municipality_name} size="lg" />
				</div>

			</Section>

			<Section>
				<div className={styles.iconsWrapper}>
					{stopsDetailContext.data.stop.facilities && (
						<>
							{stopsDetailContext.data.stop.facilities.map(facility => (
								<div className={styles.iconFacilityWrapper}>
									<IconDisplay key={facility} category="facilities" name={facility} />
								</div>
							))}
							<div className={styles.iconsDivider} />
						</>
					)}
					{stopsDetailContext.data.lines && stopsDetailContext.data.lines.map(line => (
						<div className={styles.iconLineBadgeWrapper}>
							<LineBadge key={line.id} line={line} />
						</div>
					))}
				</div>
			</Section>

		</Surface>
	);

	//
}
