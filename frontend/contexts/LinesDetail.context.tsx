'use client';

/* * */

import type { Alert, SimplifiedAlert } from '@/types/alerts.types';
import type { Line, Pattern, PatternGroup, Route, Shape } from '@/types/lines.types.js';
import type { Stop } from '@/types/stops.types';
import type { DemandByLine } from '@/utils/types';

import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import convertToSimplifiedAlert from '@/utils/convertToSimplifiedAlert';
import { Routes } from '@/utils/routes';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface LinesDetailContextState {
	actions: {
		setActivePatternGroup: (patternGroupId: string) => void
		setActiveStop: (sequence: number, stop: Stop) => void
		setDrawerOpen: (isOpen: boolean) => void
	}
	data: {
		active_alerts: null | SimplifiedAlert[]
		active_pattern_group: null | PatternGroup
		active_shape: null | Shape
		active_stop: {
			sequence: number
			stop: Stop
		} | null
		all_patterns: null | Pattern[]
		all_routes: null | Route[]
		demand: DemandByLine | null
		drawer_open: boolean
		line: Line | null
		timetable: string
		valid_pattern_groups: null | PatternGroup[]
	}
	filters: {
		// active_pattern_group_id: null | string
		active_pattern_id: null | string
		active_stop_id: null | string
	}
	flags: {
		is_favorite: boolean
		is_loading: boolean
	}
}

/* * */

const LinesDetailContext = createContext<LinesDetailContextState | undefined>(undefined);

export function useLinesDetailContext() {
	const context = useContext(LinesDetailContext);
	if (!context) {
		throw new Error('useLinesDetailContext must be used within a LinesDetailContextProvider');
	}
	return context;
}

/* * */

export const LinesDetailContextProvider = ({ children, lineId }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();
	const operationalDayContext = useOperationalDayContext();

	const [dataRoutesState, setDataRoutesState] = useState<null | Route[]>(null);
	const [dataAllPatternsState, setDataAllPatternsState] = useState<null | Pattern[]>(null);
	const [dataValidPatternGroupsState, setDataValidPatternGroupsState] = useState<null | PatternGroup[]>(null);
	const [dataDemandForCurrentLineState, setDataDemandForCurrentLineState] = useState<DemandByLine | null>(null);

	const [dataActiveAlertsState, setDataActiveAlertsState] = useState<null | SimplifiedAlert[]>(null);
	const [dataActivePatternGroupState, setDataActivePatternGroupState] = useState<null | PatternGroup>(null);
	const [dataActiveShapeState, setDataActiveShapeState] = useState<null | Shape>(null);

	const [dataActiveStopState, setDataActiveStopState] = useState<{ sequence: number, stop: Stop } | null>(null);

	const [flagIsFavoriteState, setFlagIsFavoriteState] = useState<boolean>(false);

	const [dataDrawerOpenState, setDataDrawerOpenState] = useState<boolean>(false);

	const [filterActivePatternGroupIdState, setFilterActivePatternGroupIdState] = useQueryState('active_pattern_id');
	// const [filterActivePatternGroupIdState, setFilterActivePatternGroupIdState] = useQueryState('active_pattern_group_id');
	const [filterActiveStopIdState, setFilterActiveStopIdState] = useQueryState('active_stop_id');

	//
	// B. Fetch data

	const { data: lineData, isLoading: lineLoading } = useSWR<Line, Error>(`${Routes.API}/v2/lines/${lineId}`);
	const { data: allAlertsData, isLoading: allAlertsLoading } = useSWR<Alert[], Error>(`${Routes.API}/v2/alerts`);
	const { data: allDemandByLineData } = useSWR<DemandByLine[], Error>(`${Routes.API}/v2/metrics/demand/by_line`);

	useEffect(() => {
		(async () => {
			try {
				if (!lineData) return;
				const fetchPromises = lineData.route_ids.map((routeId) => {
					return fetch(`${Routes.API}/v2/routes/${routeId}`).then(response => response.json());
				});
				const resultData = await Promise.all(fetchPromises);
				setDataRoutesState(resultData);
			}
			catch (error) {
				console.error('Error fetching route data:', error);
			}
		})();
	}, [lineData]);

	useEffect(() => {
		(async () => {
			try {
				if (!lineData) return;
				const fetchPromises = lineData.pattern_ids.map((patternId) => {
					return fetch(`${Routes.API}/v2/patterns/${patternId}`).then(response => response.json());
				});
				const resultData = await Promise.all(fetchPromises);
				setDataAllPatternsState(resultData);
			}
			catch (error) {
				console.error('Error fetching pattern data:', error);
			}
		})();
	}, [lineData]);

	useEffect(() => {
		(async () => {
			try {
				if (!dataActivePatternGroupState) return;
				const resultData = await fetch(`${Routes.API}/v2/shapes/${dataActivePatternGroupState.shape_id}`).then(response => response.json());
				setDataActiveShapeState(resultData);
			}
			catch (error) {
				console.error('Error fetching shape data:', error);
			}
		})();
	}, [dataActivePatternGroupState]);

	//
	// C. Transform data

	useEffect(() => {
		setFlagIsFavoriteState(profileContext.data.profile?.favorite_lines?.includes(lineId) ? true : false);
	}, [profileContext.data.profile?.favorite_lines, lineId]);

	useEffect(() => {
		if (!dataAllPatternsState || !operationalDayContext.data.selected_day) return;
		const activePatternGroups: PatternGroup[] = [];
		for (const pattern of dataAllPatternsState) {
			for (const patternGroup of pattern) {
				const selected_date = operationalDayContext.data.selected_day;
				if (!selected_date) return;

				// Find the closest valid date
				const closest_date = patternGroup.valid_on.reduce((acc, curr) => {
					if (selected_date <= curr && (acc === '' || curr < acc)) return curr;

					return acc;
				}, '');

				// If the closest date is valid, add the pattern group to the list
				if (closest_date != '' && !activePatternGroups.find(activePatternGroup => activePatternGroup.pattern_id === patternGroup.pattern_id)) {
					activePatternGroups.push(patternGroup);
				}
			}
		}
		setDataValidPatternGroupsState(activePatternGroups);
		if (!dataActivePatternGroupState) {
			setDataActivePatternGroupState(activePatternGroups[0] || null);
		}
	}, [dataAllPatternsState, operationalDayContext.data.selected_day]);

	useEffect(() => {
		if (!allAlertsData) return;
		const simplifiedAlerts = allAlertsData.map(alertData => convertToSimplifiedAlert(alertData));
		const activeAlerts = simplifiedAlerts.filter((simplifiedAlertData) => {
			return simplifiedAlertData.informed_entity.some((informedEntity) => {
				if (!lineData || !informedEntity.routeId) return false;
				const hasMatchingRoute = lineData.route_ids.includes(informedEntity.routeId);
				const isActive = simplifiedAlertData.start_date <= new Date() && simplifiedAlertData.end_date >= new Date();
				return hasMatchingRoute && isActive;
			});
		});
		setDataActiveAlertsState(activeAlerts);
	}, [allAlertsData, lineData]);

	useEffect(() => {
		if (!allDemandByLineData) return;
		const demandForCurrentLine = allDemandByLineData.find(demandByLineItem => demandByLineItem.line_id === lineData?.line_id);
		setDataDemandForCurrentLineState(demandForCurrentLine || null);
	}, [allDemandByLineData, lineData]);

	//
	// D. Handle actions

	const setActivePatternGroup = (patternGroupId: string) => {
		for (const patternGroup of dataValidPatternGroupsState || []) {
			if (patternGroup.pattern_group_id === patternGroupId) {
				setDataActivePatternGroupState(patternGroup);
				setFilterActivePatternGroupIdState(patternGroup.pattern_id);
				return;
			}
		}
		setDataActivePatternGroupState(null);
	};

	const setActiveStop = (sequence: number, stop: Stop) => {
		setDataActiveStopState({ sequence, stop });
		setFilterActiveStopIdState(stop.id);
	};

	const setDrawerOpen = (isOpen: boolean) => {
		setDataDrawerOpenState(isOpen);
	};

	//
	// E. Handle Filters State
	useEffect(() => {
		if (!dataValidPatternGroupsState) return;

		const activePatternGroup = dataValidPatternGroupsState.find(
			patternGroup => patternGroup.pattern_id === filterActivePatternGroupIdState,
		);

		setDataActivePatternGroupState(activePatternGroup || dataValidPatternGroupsState[0] || null);
	}, [dataValidPatternGroupsState, filterActivePatternGroupIdState]);

	useEffect(() => {
		const sortedStops = dataActivePatternGroupState?.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
		if (!sortedStops) return;

		const selectedStop = filterActiveStopIdState
			? sortedStops.find(stop => stop.stop.id === filterActiveStopIdState) ?? sortedStops[0]
			: sortedStops[0];
		if (selectedStop) setActiveStop(selectedStop.stop_sequence, selectedStop.stop);
	}, [dataActivePatternGroupState, dataValidPatternGroupsState]);

	//
	// F. Define context value

	const contextValue: LinesDetailContextState = {
		actions: {
			setActivePatternGroup,
			setActiveStop,
			setDrawerOpen,
		},
		data: {
			active_alerts: dataActiveAlertsState,
			active_pattern_group: dataActivePatternGroupState,
			active_shape: dataActiveShapeState,
			active_stop: dataActiveStopState,
			all_patterns: dataAllPatternsState,
			all_routes: dataRoutesState,
			demand: dataDemandForCurrentLineState,
			drawer_open: dataDrawerOpenState,
			line: lineData || null,
			timetable: '',
			valid_pattern_groups: dataValidPatternGroupsState,
		},
		filters: {
			active_pattern_id: filterActivePatternGroupIdState,
			active_stop_id: filterActiveStopIdState,
		},
		flags: {
			is_favorite: flagIsFavoriteState,
			is_loading: lineLoading || dataRoutesState === null || dataAllPatternsState === null || allAlertsLoading,
		},
	};

	//
	// F. Render components

	return (
		<LinesDetailContext.Provider value={contextValue}>
			{children}
		</LinesDetailContext.Provider>
	);

	//
};
