/* * */

import type { AlertCause, AlertEffect } from '@/types/alerts.types';

import { IconAccessible, IconAmbulance, IconArrowBigUpLines, IconBarrierBlock, IconCalendarEvent, IconCarCrash, IconCircleArrowDown, IconCircleMinus, IconClock2, IconClockExclamation, IconCloudStorm, IconFish, IconInfoTriangle, IconRoadOff, IconRouteAltRight, IconServerCog, IconSettings, IconSpeakerphone, IconTool, IconTrafficCone } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface AlertCauseIconProps {
	cause?: AlertCause
	className?: string
	withText?: boolean
}

interface AlertEffectIconProps {
	className?: string
	effect?: AlertEffect
	withText?: boolean
}

/* * */

export function AlertCauseIcon({ cause, className, withText = false }: AlertCauseIconProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertCauseEffectIcon.cause');

	//
	// B. Transform data

	let severityLevel: number;
	switch (cause) {
		case 'ACCIDENT':
		case 'CONSTRUCTION':
		case 'DEMONSTRATION':
		case 'DRIVER_ABSENCE':
		case 'DRIVER_ISSUE':
		case 'HIGH_PASSENGER_LOAD':
		case 'MAINTENANCE':
		case 'MEDICAL_EMERGENCY':
		case 'POLICE_ACTIVITY':
		case 'ROAD_INCIDENT':
		case 'STRIKE':
		case 'SYSTEM_FAILURE':
		case 'TECHNICAL_PROBLEM':
		case 'TRAFFIC_JAM':
		case 'WEATHER':
			severityLevel = 3;
			break;
		case 'HOLIDAY':
			severityLevel = 0;
			break;
		default:
			severityLevel = 2;
			break;
	}

	let icon: React.ReactNode;
	switch (cause) {
		case 'ACCIDENT':
		case 'TECHNICAL_PROBLEM':
			icon = <IconCarCrash className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'CONSTRUCTION':
			icon = <IconBarrierBlock className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'DEMONSTRATION':
		case 'STRIKE':
			icon = <IconSpeakerphone className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'HIGH_PASSENGER_LOAD':
			icon = <IconFish className={styles[`severityLevel_${severityLevel}`]} size={20} style={{ transform: 'rotate(90deg) ' }} />;
			break;
		case 'HOLIDAY':
			icon = <IconCalendarEvent className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'MAINTENANCE':
			icon = <IconTool className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'MEDICAL_EMERGENCY':
		case 'POLICE_ACTIVITY':
			icon = <IconAmbulance className={styles[`severityLevel_${severityLevel}`]} size={20} />;
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
			icon = <IconCloudStorm className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		default:
			icon = <IconInfoTriangle className={styles[`severityLevel_${severityLevel}`]} size={20} />;
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

export function AlertEffectIcon({ className, effect, withText = false }: AlertEffectIconProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertCauseEffectIcon.effect');

	//
	// B. Transform data

	let severityLevel: number;
	switch (effect) {
		case 'ACCESSIBILITY_ISSUE':
		case 'MODIFIED_SERVICE':
			severityLevel = 0;
			break;
		case 'ADDITIONAL_SERVICE':
			severityLevel = 1;
			break;
		case 'NO_SERVICE':
		case 'SIGNIFICANT_DELAYS':
			severityLevel = 3;
			break;
		default:
			severityLevel = 2;
			break;
	}

	let icon: React.ReactNode;
	switch (effect) {
		case 'ACCESSIBILITY_ISSUE':
			icon = <IconAccessible className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'ADDITIONAL_SERVICE':
			icon = <IconArrowBigUpLines className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'DETOUR':
			icon = <IconRouteAltRight className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'MODIFIED_SERVICE':
			icon = <IconClock2 className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'NO_SERVICE':
			icon = <IconCircleMinus className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'REDUCED_SERVICE':
			icon = <IconCircleArrowDown className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		case 'SIGNIFICANT_DELAYS':
			icon = <IconClockExclamation className={styles[`severityLevel_${severityLevel}`]} size={20} />;
			break;
		default:
			icon = <IconInfoTriangle className={styles[`severityLevel_${severityLevel}`]} size={20} />;
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
