'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { CopyBadge } from '@/components/common/CopyBadge';
import { FavoriteToggle } from '@/components/common/FavoriteToggle';
import { IconDisplay } from '@/components/common/IconDisplay';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LineBadge } from '@/components/lines/LineBadge';
import { StopDisplayLocation } from '@/components/stops/StopDisplayLocation';
import { StopDisplayName } from '@/components/stops/StopDisplayName';
import { StopDisplayTts } from '@/components/stops/StopDisplayTts';
import { useEnvironmentContext } from '@/contexts/Environment.context';
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
	const environmentContext = useEnvironmentContext();
	const isMupi = environmentContext.data.value === 'mupi';

	//
	// B. Handle actions

	const handleToggleFavorite = () => {
		if (!stopsDetailContext.data.stop) return;
		try {
			profileContext.actions.toggleFavoriteStop(stopsDetailContext.data.stop._id.toString());
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

			<Section withBottomDivider withPadding>
				<BackButton href="/stops" />
			</Section>

			<Section withGap withPadding>

				<div className={styles.badgesWrapper}>
					<CopyBadge
						label={'#' + stopsDetailContext.data.stop._id}
						value={stopsDetailContext.data.stop._id}
					/>
					<CopyBadge
						hasBorder={false}
						label={`${stopsDetailContext.data.stop.latitude}, ${stopsDetailContext.data.stop.longitude}`}
						value={stopsDetailContext.data.stop.latitude + ',' + stopsDetailContext.data.stop.longitude}
					/>
				</div>

				<div className={styles.headingWrapper}>
					<div className={styles.nameWrapper}>
						<StopDisplayName longName={stopsDetailContext.data.stop.name} size="lg" />
						<StopDisplayTts stopId={stopsDetailContext.data.stop._id.toString()} />
						{!isMupi && <FavoriteToggle color="var(--color-brand)" isActive={stopsDetailContext.flags.is_favorite} onToggle={handleToggleFavorite} />}
					</div>
					<StopDisplayLocation localityName={stopsDetailContext.data.stop.locality_name} municipalityName={stopsDetailContext.data.stop.municipality_name} size="lg" />
				</div>

			</Section>

			<Section>
				<div className={styles.iconsWrapper}>
					{stopsDetailContext.data.stop.flags.length > 0 && (
						<>
							{stopsDetailContext.data.stop.flags.map((facility, index) => (
								<div key={index} className={styles.iconFacilityWrapper}>
									<IconDisplay key={facility.short_name} category="facilities" name={facility.short_name} />
								</div>
							))}
							<div className={styles.iconsDivider} />
						</>
					)}
					{stopsDetailContext.data.lines && stopsDetailContext.data.lines.map(line => (
						<div key={line._id} className={styles.iconLineBadgeWrapper}>
							<LineBadge key={line._id} lineData={line} />
						</div>
					))}
				</div>
			</Section>

		</Surface>
	);

	//
}
