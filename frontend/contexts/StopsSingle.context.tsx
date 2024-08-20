'use client';

/* * */

import type { Stop } from '@/types/stops.types';

import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { Alert, SimplifiedAlert } from '@/types/alerts.types';
import { Pattern, PatternGroup, Route } from '@/types/lines.types';
import convertToSimplifiedAlert from '@/utils/convertToSimplifiedAlert';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface StopsSingleContextState {
	actions: {
		setActivePatternGroup: (patternGroupId: string) => void
	}
	data: {
		active_alerts: SimplifiedAlert[] | null
		active_pattern_group: PatternGroup | null
		all_patterns: Pattern[] | null
		all_routes: Route[] | null
		stop: Stop | null
		timetable: string
		valid_pattern_groups: PatternGroup[] | null
	}
	filters: {
		none: null | string
	}
	flags: {
		is_favorite: boolean
		is_loading: boolean
	}
}

/* * */

const StopsSingleContext = createContext<StopsSingleContextState | undefined>(undefined);

export function useStopsSingleContext() {
	const context = useContext(StopsSingleContext);
	if (!context) {
		throw new Error('useStopsSingleContext must be used within a StopsSingleContextProvider');
	}
	return context;
}

/* * */

export const StopsSingleContextProvider = ({ children, stopId }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();
	const operationalDayContext = useOperationalDayContext();

	const [dataRoutesState, setDataRoutesState] = useState<Route[] | null>(null);
	const [dataAllPatternsState, setDataAllPatternsState] = useState<Pattern[] | null>(null);
	const [dataValidPatternGroupsState, setDataValidPatternGroupsState] = useState<PatternGroup[] | null>(null);
	const [dataActivePatternGroupState, setDataActivePatternGroupState] = useState<PatternGroup | null>(null);
	const [dataActiveAlertsState, setDataActiveAlertsState] = useState<SimplifiedAlert[] | null>(null);

	const [flagIsFavoriteState, setFlagIsFavoriteState] = useState<boolean>(false);

	//
	// B. Fetch data

	const { data: stopData, isLoading: stopLoading } = useSWR<Stop, Error>(`https://api.carrismetropolitana.pt/v2/stops/${stopId}`);
	const { data: allAlertsData, isLoading: allAlertsLoading } = useSWR<Alert[], Error>('https://api.carrismetropolitana.pt/v2/alerts');

	useEffect(() => {
		(async () => {
			try {
				if (!stopData) return;
				const fetchPromises = stopData.routes.map((routeId) => {
					return fetch(`https://api.carrismetropolitana.pt/v2/routes/${routeId}`).then(response => response.json());
				});
				const resultData = await Promise.all(fetchPromises);
				setDataRoutesState(resultData);
			}
			catch (error) {
				console.error('Error fetching route data:', error);
			}
		})();
	}, [stopData]);

	useEffect(() => {
		(async () => {
			try {
				if (!stopData) return;
				const fetchPromises = stopData.patterns.map((patternId) => {
					return fetch(`https://api.carrismetropolitana.pt/v2/patterns/${patternId}`).then(response => response.json());
				});
				const resultData = await Promise.all(fetchPromises);
				setDataAllPatternsState(resultData);
			}
			catch (error) {
				console.error('Error fetching pattern data:', error);
			}
		})();
	}, [stopData]);

	//
	// C. Transform data

	useEffect(() => {
		setFlagIsFavoriteState(profileContext.data.favorite_stops?.includes(stopId) ? true : false);
	}, [profileContext.data.favorite_stops, stopId]);

	useEffect(() => {
		if (!dataAllPatternsState || !operationalDayContext.data.selected_day) return;
		const activePatternGroups: PatternGroup[] = [];
		for (const pattern of dataAllPatternsState) {
			for (const patternGroup of pattern) {
				if (patternGroup.valid_on.includes(operationalDayContext.data.selected_day)) {
					activePatternGroups.push(patternGroup);
				}
			}
		}
		setDataValidPatternGroupsState(activePatternGroups);
	}, [dataAllPatternsState, operationalDayContext.data.selected_day]);

	useEffect(() => {
		if (!allAlertsData) return;
		const simplifiedAlerts = allAlertsData.map(alertData => convertToSimplifiedAlert(alertData));
		const activeAlerts = simplifiedAlerts.filter((simplifiedAlertData) => {
			return simplifiedAlertData.informed_entity.some((informedEntity) => {
				if (!stopData || !informedEntity.routeId) return false;
				const hasMatchingRoute = stopData.routes.includes(informedEntity.routeId);
				const isActive = simplifiedAlertData.start_date <= new Date() && simplifiedAlertData.end_date >= new Date();
				return hasMatchingRoute && isActive;
			});
		});
		setDataActiveAlertsState(activeAlerts);
	}, [allAlertsData, stopData]);

	//
	// D. Handle actions

	const setActivePatternGroup = (patternGroupId: string) => {
		for (const patternGroup of dataValidPatternGroupsState || []) {
			if (patternGroup.pattern_group_id === patternGroupId) {
				setDataActivePatternGroupState(patternGroup);
				return;
			}
		}
		setDataActivePatternGroupState(null);
	};

	//
	// E. Define context value

	const contextValue: StopsSingleContextState = {
		actions: {
			setActivePatternGroup,
		},
		data: {
			active_alerts: dataActiveAlertsState,
			active_pattern_group: dataActivePatternGroupState,
			all_patterns: dataAllPatternsState,
			all_routes: dataRoutesState,
			stop: stopData || null,
			timetable: '',
			valid_pattern_groups: dataValidPatternGroupsState,
		},
		filters: {
			none: null,
		},
		flags: {
			is_favorite: flagIsFavoriteState,
			is_loading: stopLoading || dataRoutesState === null || dataAllPatternsState === null || allAlertsLoading,
		},
	};

	//
	// F. Render components

	return (
		<StopsSingleContext.Provider value={contextValue}>
			{children}
		</StopsSingleContext.Provider>
	);

	//
};
