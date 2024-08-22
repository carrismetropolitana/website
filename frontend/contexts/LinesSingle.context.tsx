'use client';

/* * */

import type { Line, Pattern, PatternGroup, Route, Shape } from '@/types/lines.types.js';

import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { Alert, SimplifiedAlert } from '@/types/alerts.types';
import convertToSimplifiedAlert from '@/utils/convertToSimplifiedAlert';
import { DemandByLine } from '@/utils/types';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface LinesSingleContextState {
	actions: {
		setActivePatternGroup: (patternGroupId: string) => void
	}
	data: {
		active_alerts: SimplifiedAlert[] | null
		active_pattern_group: PatternGroup | null
		active_shape: Shape | null
		all_patterns: Pattern[] | null
		all_routes: Route[] | null
		demand: DemandByLine | null
		line: Line | null
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

const LinesSingleContext = createContext<LinesSingleContextState | undefined>(undefined);

export function useLinesSingleContext() {
	const context = useContext(LinesSingleContext);
	if (!context) {
		throw new Error('useLinesSingleContext must be used within a LinesSingleContextProvider');
	}
	return context;
}

/* * */

export const LinesSingleContextProvider = ({ children, lineId }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();
	const operationalDayContext = useOperationalDayContext();

	const [dataRoutesState, setDataRoutesState] = useState<Route[] | null>(null);
	const [dataAllPatternsState, setDataAllPatternsState] = useState<Pattern[] | null>(null);
	const [dataValidPatternGroupsState, setDataValidPatternGroupsState] = useState<PatternGroup[] | null>(null);
	const [dataDemandForCurrentLineState, setDataDemandForCurrentLineState] = useState<DemandByLine | null>(null);

	const [dataActiveAlertsState, setDataActiveAlertsState] = useState<SimplifiedAlert[] | null>(null);
	const [dataActivePatternGroupState, setDataActivePatternGroupState] = useState<PatternGroup | null>(null);
	const [dataActiveShapeState, setDataActiveShapeState] = useState<Shape | null>(null);

	const [flagIsFavoriteState, setFlagIsFavoriteState] = useState<boolean>(false);

	//
	// B. Fetch data

	const { data: lineData, isLoading: lineLoading } = useSWR<Line, Error>(`https://api.carrismetropolitana.pt/v2/lines/${lineId}`);
	const { data: allAlertsData, isLoading: allAlertsLoading } = useSWR<Alert[], Error>('https://api.carrismetropolitana.pt/v2/alerts');
	const { data: allDemandByLineData, isLoading: allDemandByLineLoading } = useSWR<DemandByLine[], Error>('https://api.carrismetropolitana.pt/v2/metrics/demand/by_line');

	useEffect(() => {
		(async () => {
			try {
				if (!lineData) return;
				const fetchPromises = lineData.route_ids.map((routeId) => {
					return fetch(`https://api.carrismetropolitana.pt/v2/routes/${routeId}`).then(response => response.json());
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
					return fetch(`https://api.carrismetropolitana.pt/v2/patterns/${patternId}`).then(response => response.json());
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
				const resultData = await fetch(`https://api.carrismetropolitana.pt/v2/shapes/${dataActivePatternGroupState.shape_id}`).then(response => response.json());
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
				if (patternGroup.valid_on.includes(operationalDayContext.data.selected_day)) {
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
				return;
			}
		}
		setDataActivePatternGroupState(null);
	};

	//
	// E. Define context value

	const contextValue: LinesSingleContextState = {
		actions: {
			setActivePatternGroup,
		},
		data: {
			active_alerts: dataActiveAlertsState,
			active_pattern_group: dataActivePatternGroupState,
			active_shape: dataActiveShapeState,
			all_patterns: dataAllPatternsState,
			all_routes: dataRoutesState,
			demand: dataDemandForCurrentLineState,
			line: lineData || null,
			timetable: '',
			valid_pattern_groups: dataValidPatternGroupsState,
		},
		filters: {
			none: null,
		},
		flags: {
			is_favorite: flagIsFavoriteState,
			is_loading: lineLoading || dataRoutesState === null || dataAllPatternsState === null || allAlertsLoading,
		},
	};

	//
	// F. Render components

	return (
		<LinesSingleContext.Provider value={contextValue}>
			{children}
		</LinesSingleContext.Provider>
	);

	//
};
