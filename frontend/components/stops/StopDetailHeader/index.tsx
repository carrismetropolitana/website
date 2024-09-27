'use client';

/* * */

import CopyBadge from '@/components/common/CopyBadge';
import FacilityIcon from '@/components/common/IconDisplay';
import FavoriteToggle from '@/components/common/FavoriteToggle';
import Section from '@/components/layout/Section';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { formatLocation } from '@/utils/formatLocation';
import toast from '@/utils/toast';
import { IconVolume } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetail');
	const profileContext = useProfileContext();
	const stopsDetailContext = useStopsSingleContext();
	const currentStop = useMemo(() => stopsDetailContext.data.stop, [stopsDetailContext.data.stop]);

	//
	// B. Handle actions

	const handleToggleFavorite = () => {
		if (!currentStop) return;
		try {
			profileContext.actions.toggleFavoriteStop(currentStop.id);
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
	// C. Render components

	if (!currentStop) {
		return <Section withTopBorder={false} backRouter withChildrenPadding />;
	}

	return (
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
				<FavoriteToggle classNames={styles.favoriteIcon} color="var(--color-brand)" isActive={stopsDetailContext.flags.is_favorite} onToggle={handleToggleFavorite} />
			</span>
			<span className={styles.stopLocation}>
				{formatLocation([currentStop.locality, currentStop.municipality_name, currentStop.district_name])}
			</span>
			<div className={styles.badges}>
				{currentStop.facilities.map(facility => (
					<FacilityIcon key={facility} name={facility} />))}
			</div>
		</Section>
	);

	//
}
