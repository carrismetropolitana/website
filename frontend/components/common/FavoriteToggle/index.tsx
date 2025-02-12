/* * */

import { Loader } from '@/components/common/Loader';
import { useConsentContext } from '@/contexts/Consent.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { Tooltip } from '@mantine/core';
import { IconHeart, IconHeartFilled, IconHeartX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	classNames?: string
	color: string
	isActive: boolean | null
	onToggle: () => void
}

/* * */

export function FavoriteToggle({ color, isActive, onToggle }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.FavoriteToggle');

	const profileContext = useProfileContext();
	const consentContext = useConsentContext();

	//
	// B. Handle Actions

	const handleRequestConsent = () => {
		consentContext.actions.ask();
	};

	//
	// C. Render components

	if (profileContext.flags.is_loading) {
		return (
			<div className={styles.container}>
				<Loader visible />
			</div>
		);
	}

	if (!profileContext.flags.is_enabled) {
		return (
			<div className={`${styles.container} ${styles.disabled}`} onClick={handleRequestConsent}>
				<Tooltip
					events={{ focus: true, hover: true, touch: true }}
					label={t('disabled')}
					withArrow
				>
					<IconHeartX />
				</Tooltip>
			</div>
		);
	}

	if (isActive) {
		return (
			<div className={styles.container} onClick={onToggle} style={{ color: color }}>
				<IconHeartFilled />
			</div>
		);
	}

	return (
		<div className={styles.container} onClick={onToggle}>
			<IconHeart />
		</div>
	);

	//
}
