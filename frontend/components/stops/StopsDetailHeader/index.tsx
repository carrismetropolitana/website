'use client';

/* * */

import CopyBadge from '@/components/common/CopyBadge';
import FavoriteToggle from '@/components/common/FavoriteToggle';
import { IconDisplay } from '@/components/common/IconDisplay';
import Section from '@/components/layout/Section';
import { StopDisplayName } from '@/components/stops/StopDisplayName';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import toast from '@/utils/toast';
import { useTranslations } from 'next-intl';

import { StopDisplayLocation } from '../StopDisplayLocation';
import { StopDisplayTts } from '../StopDisplayTts';
import styles from './styles.module.css';

/* * */

export function StopsDetailHeader() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetail');
	const profileContext = useProfileContext();
	const stopsDetailContext = useStopsSingleContext();

	//
	// B. Handle actions

	const handleToggleFavorite = () => {
		if (!stopsDetailContext.data.stop) return;
		try {
			profileContext.actions.toggleFavoriteStop(stopsDetailContext.data.stop.id);
		}
		catch (error) {
			toast.error({ message: t('toast.toggle_favorite_error', { error: error.message }) });
		}
	};

	//
	// C. Render components

	if (!stopsDetailContext.data.stop) {
		return <Section withTopBorder={false} backRouter withChildrenPadding />;
	}

	return (
		<Section childrenWrapperStyles={styles.container} withGap={false} withTopBorder={false} backRouter withChildrenPadding>

			<div className={styles.badgesWrapper}>
				<CopyBadge
					label={'#' + stopsDetailContext.data.stop.id}
					size="lg"
					value={stopsDetailContext.data.stop.id}
				/>
				<CopyBadge
					hasBorder={false}
					label={`${stopsDetailContext.data.stop.lat}, ${stopsDetailContext.data.stop.lon}`}
					size="lg"
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

			<div className={styles.iconsWrapper}>
				{stopsDetailContext.data.stop.facilities.map(facility => (
					<IconDisplay key={facility} category="facilities" name={facility} />
				))}
			</div>

		</Section>
	);

	//
}
