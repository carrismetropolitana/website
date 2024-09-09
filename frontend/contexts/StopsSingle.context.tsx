'use client';

/* * */

import type { Stop, StopRealtime } from '@/types/stops.types';

import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { Alert, SimplifiedAlert } from '@/types/alerts.types';
import { Line, Pattern, PatternGroup, Route } from '@/types/lines.types';
import convertToSimplifiedAlert from '@/utils/convertToSimplifiedAlert';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

interface StopsSingleContextState {
	actions: {
		setActivePatternGroup: (patternGroupId: string) => void
		setActiveTripId: (tripId: string) => void
		setStopId: (stopId: string) => void
	}
	data: {
		active_alerts: SimplifiedAlert[] | null
		active_pattern_group: PatternGroup | null
		active_trip_id: null | string
		all_patterns: Pattern[] | null
		all_routes: Route[] | null
		realtime: StopRealtime[] | null
		stop: Stop | null
		timetable: string
		valid_lines: Line[] | null
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

export const StopsSingleContextProvider = ({ children, stopId }: { children: React.ReactNode, stopId: string }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();
	const operationalDayContext = useOperationalDayContext();

	const [stopIdState, setStopIdState] = useState<string>(stopId);

	const [dataRoutesState, setDataRoutesState] = useState<Route[] | null>(null);
	const [dataAllPatternsState, setDataAllPatternsState] = useState<Pattern[] | null>(null);
	const [dataValidPatternGroupsState, setDataValidPatternGroupsState] = useState<PatternGroup[] | null>(null);
	const [dataActivePatternGroupState, setDataActivePatternGroupState] = useState<PatternGroup | null>(null);
	const [dataActiveAlertsState, setDataActiveAlertsState] = useState<SimplifiedAlert[] | null>(null);
	const [dataActiveTripIdState, setDataActiveTripIdState] = useState<null | string>(null);
	// const [dataActiveLineState, setDataActiveLineState] = useState<Line | null>(null);
	const [dataValidLinesState, setDataValidLinesState] = useState<Line[] | null>(null);

	const [dataRealtimeState, setDataRealtimeState] = useState<StopRealtime[] | null>(null);

	const [flagIsFavoriteState, setFlagIsFavoriteState] = useState<boolean>(false);

	//
	// B. Fetch data
	const { data: allLinesData, isLoading: allLinesLoading } = useSWR<Line[], Error>('https://api.carrismetropolitana.pt/v2/lines');

	const { data: allStopData, isLoading: allStopLoading } = useSWR<Stop[], Error>('https://api.carrismetropolitana.pt/v2/stops');
	const stopData = allStopData?.find(stop => stop.id === stopIdState);

	// const { data: stopData, isLoading: stopLoading } = useSWR<Stop, Error>(`https://api.carrismetropolitana.pt/v2/stops/${stopIdState}`);
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

	// Fill stoprealtime
	useEffect(() => {
		// Required to prevent unordered responses from overwriting the state
		let isCancelled = false;
		(async () => {
			const realtimeData = await fetch(`https://api.carrismetropolitana.pt/v2/stops/${stopId}/realtime`).then(response => response.json());
			if (!isCancelled) {
				setDataRealtimeState(realtimeData);
			}
		})();
		return () => {
			isCancelled = true;
		};
	}, [stopId]);

	const linesMap = useMemo(() => {
		if (!allLinesData) return new Map<string, Line>();
		const mappedLines = new Map<string, Line>();
		for (const line of allLinesData) {
			mappedLines.set(line.line_id, line);
		}
		return mappedLines;
	}, [allLinesData]);

	useEffect(() => {
		if (!stopData) return;
		setDataValidLinesState(stopData.lines.map(routeId => linesMap.get(routeId)).filter(line => line !== undefined));
	}, [stopData, linesMap]);

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
		setFlagIsFavoriteState(profileContext.data.profile?.favorite_stops?.includes(stopId) ? true : false);
	}, [profileContext.data.profile?.favorite_stops, stopId]);

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

	const setStopId = (stopId: string) => {
		// TODO change this into proper state management
		window.history.replaceState({}, '', `/stops/${stopId}`);
		setStopIdState(stopId);
	};

	const setActiveTripId = (tripId: string) => {
		setDataActiveTripIdState(tripId);
	};

	//
	// E. Define context value

	const contextValue: StopsSingleContextState = {
		actions: {
			setActivePatternGroup,
			setActiveTripId,
			setStopId,
		},
		data: {
			active_alerts: dataActiveAlertsState,
			active_pattern_group: dataActivePatternGroupState,
			active_trip_id: dataActiveTripIdState,
			all_patterns: dataAllPatternsState,
			all_routes: dataRoutesState,
			realtime: dataRealtimeState,
			stop: stopData || null,
			timetable: '',
			valid_lines: dataValidLinesState,
			valid_pattern_groups: dataValidPatternGroupsState,
		},
		filters: {
			none: null,
		},
		flags: {
			is_favorite: flagIsFavoriteState,
			is_loading: stopData == undefined || dataRoutesState === null || dataAllPatternsState === null || allAlertsLoading,
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
