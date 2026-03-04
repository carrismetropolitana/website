/* * */

import type { AlertCause, AlertEffect } from '@/types/alerts.types';

import { getCauseSeverityLevel, getEffectSeverityLevel } from '@/utils/alerts';
import { IconAccessible, IconAmbulance, IconArrowBigUpLines, IconBarrierBlock, IconCalendarEvent, IconCarCrash, IconCircleArrowDown, IconCircleMinus, IconClock2, IconClockExclamation, IconCloudStorm, IconFish, IconInfoTriangle, IconRoadOff, IconRouteAltRight, IconServerCog, IconSettings, IconSpeakerphone, IconTool, IconTrafficCone } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface AlertCauseIconProps {
	cause?: AlertCause
	className?: string
	size?: 'lg' | 'md'
	withText?: boolean
}

interface AlertEffectIconProps {
	className?: string
	effect?: AlertEffect
	size?: 'lg' | 'md'
	withText?: boolean
}

/* * */

export function AlertCauseIcon({ cause, className, size, withText = false }: AlertCauseIconProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertCauseEffectIcon.cause');

	//
	// B. Transform data

	const severityLevel = getCauseSeverityLevel(cause);

	let icon: React.ReactNode;
	const iconSize = size === 'md' ? 20 : size === 'lg' ? 30 : 20;
	switch (cause) {
		case 'ACCIDENT':
		case 'TECHNICAL_PROBLEM':
			icon = <IconCarCrash className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'CONSTRUCTION':
			icon = <IconBarrierBlock className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'DEMONSTRATION':
		case 'STRIKE':
			icon = <IconSpeakerphone className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'HIGH_PASSENGER_LOAD':
			icon = <IconFish className={styles[`severityLevel_${severityLevel}`]} size={20} style={{ transform: 'rotate(90deg) ' }} />;
			break;
		case 'HOLIDAY':
			icon = <IconCalendarEvent className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'MAINTENANCE':
			icon = <IconTool className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'MEDICAL_EMERGENCY':
		case 'POLICE_ACTIVITY':
			icon = <IconAmbulance className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'ROAD_INCIDENT':
			icon = <IconRoadOff className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'SYSTEM_FAILURE':
			icon = <IconServerCog className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'TRAFFIC_JAM':
			icon = <IconTrafficCone className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'VEHICLE_ISSUE':
			icon = <IconSettings className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'WEATHER':
			icon = <IconCloudStorm className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		default:
			icon = <IconInfoTriangle className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
	}

	//
	// C. Render components

	if (withText && icon && cause) {
		return (
			<div className={`${styles.container} ${styles[`severityLevel_${severityLevel}`]} ${className && className}`}>
				{icon}
				<span className={styles.label}>{t(cause)}</span>
			</div>
		);
	}

	return icon;

	//
}

/* * */

export function AlertEffectIcon({ className, effect, size, withText = false }: AlertEffectIconProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertCauseEffectIcon.effect');
	const severityLevel = getEffectSeverityLevel(effect);

	//
	// B. Transform data

	let icon: React.ReactNode;
	const iconSize = size === 'md' ? 20 : size === 'lg' ? 30 : 20;
	switch (effect) {
		case 'ACCESSIBILITY_ISSUE':
			icon = <IconAccessible className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'ADDITIONAL_SERVICE':
			icon = <IconArrowBigUpLines className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'DETOUR':
			icon = <IconRouteAltRight className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'MODIFIED_SERVICE':
			icon = <IconClock2 className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'NO_SERVICE':
			icon = <IconCircleMinus className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'REDUCED_SERVICE':
			icon = <IconCircleArrowDown className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		case 'SIGNIFICANT_DELAYS':
			icon = <IconClockExclamation className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
		default:
			icon = <IconInfoTriangle className={styles[`severityLevel_${severityLevel}`]} size={iconSize} />;
			break;
	}

	//
	// C. Render components

	if (withText && icon && effect) {
		return (
			<div className={`${styles.container} ${styles[`severityLevel_${severityLevel}`]} ${className && className}`}>
				{icon}
				<span className={styles.label}>{t(effect)}</span>
			</div>
		);
	}

	return icon;

	//
}
