'use client';

/* * */

import type { SimplifiedAlert } from '@/types/alerts.types';
import type { DemandMetricsByLine, ServiceMetrics } from '@carrismetropolitana/api-types/metrics';
import type { Line, Pattern, Route, Shape, Waypoint } from '@carrismetropolitana/api-types/network';

import { useAlertsContext } from '@/contexts/Alerts.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { Routes } from '@/utils/routes';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

interface LinesDetailContextState {
	actions: {
		setActivePattern: (patternGroupId: string) => void
		setActiveWaypoint: (stopId: string, stopSequence: number,) => void
		setHighlightedTripIds: (tripIds: string[]) => void
	}
	data: {
		active_alerts: SimplifiedAlert[] | undefined
		active_pattern: null | Pattern
		active_shape: null | Shape
		active_waypoint: null | Waypoint
		all_patterns: null | Pattern[][]
		demand_metrics: DemandMetricsByLine | undefined
		highlighted_trip_ids: null | string[]
		line: Line | undefined
		routes: Route[]
		service_metrics: ServiceMetrics[]
		valid_patterns: Pattern[] | undefined
	}
	filters: {
		active_pattern_id: null | string
		active_waypoint_stop_id: null | string
		active_waypoint_stop_sequence: null | string
	}
	flags: {
		is_favorite: boolean
		is_interactive_mode: boolean
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

	const linesContext = useLinesContext();
	const stopsContext = useStopsContext();
	const alertsContext = useAlertsContext();
	const profileContext = useProfileContext();
	const operationalDayContext = useOperationalDayContext();

	const [dataLineState, setDataLineState] = useState<LinesDetailContextState['data']['line']>();
	const [dataDemandMetricsState, setDataDemandMetricsState] = useState<LinesDetailContextState['data']['demand_metrics']>();
	const [dataServiceMetricsState, setDataServiceMetricsState] = useState<LinesDetailContextState['data']['service_metrics']>([]);
	const [dataRoutesState, setDataRoutesState] = useState<LinesDetailContextState['data']['routes']>([]);

	const [dataAllPatternsState, setDataAllPatternsState] = useState<LinesDetailContextState['data']['all_patterns']>(null);
	const [dataValidPatternsState, setDataValidPatternsState] = useState<LinesDetailContextState['data']['valid_patterns']>();
	const [dataActiveAlertsState, setDataActiveAlertsState] = useState<LinesDetailContextState['data']['active_alerts']>();
	const [dataActivePatternState, setDataActivePatternState] = useState<LinesDetailContextState['data']['active_pattern']>(null);
	const [dataActiveShapeState, setDataActiveShapeState] = useState<LinesDetailContextState['data']['active_shape']>(null);
	const [dataActiveWaypointState, setDataActiveWaypointState] = useState<LinesDetailContextState['data']['active_waypoint']>(null);
	const [dataHighlightedTripIdsState, setDataHighlightedTripIdsState] = useState<LinesDetailContextState['data']['highlighted_trip_ids']>([]);
	const [filterActivePatternIdState, setFilterActivePatternIdState] = useQueryState('active_pattern_id');
	const [filterActiveWaypointStopIdState, setFilterActiveWaypointStopIdState] = useQueryState('active_waypoint_stop_id');
	const [filterActiveWaypointStopSequenceState, setFilterActiveWaypointStopSequenceState] = useQueryState('active_waypoint_stop_sequence');

	const [flagIsFavoriteState, setFlagIsFavoriteState] = useState<LinesDetailContextState['flags']['is_favorite']>(false);
	const [flagIsInteractiveModeState, setFlagIsInteractiveModeState] = useState<LinesDetailContextState['flags']['is_interactive_mode']>(false);

	//
	// B. Fetch data

	useEffect(() => {
		const lineData = linesContext.actions.getLineDataById(lineId);
		if (!lineData) return;
		setDataLineState(lineData);
	}, [lineId, linesContext.data.lines]);

	useEffect(() => {
		const isFavorite = profileContext.data.favorite_lines?.includes(lineId) ? true : false;
		setFlagIsFavoriteState(isFavorite);
	}, [profileContext.data.favorite_lines, lineId]);

	useEffect(() => {
		const serviceMetricsData = linesContext.actions.getServiceMetricsByLineId(lineId);
		if (!serviceMetricsData) return;
		setDataServiceMetricsState(serviceMetricsData);
	}, [lineId, linesContext.data.service_metrics]);

	useEffect(() => {
		const demandMetricsData = linesContext.actions.getDemandMetricsByLineId(lineId);
		if (!demandMetricsData) return;
		setDataDemandMetricsState(demandMetricsData);
	}, [lineId, linesContext.data.demand_metrics]);

	useEffect(() => {
		if (!dataLineState || !dataLineState.route_ids) return;
		dataLineState.route_ids.forEach((routeId) => {
			const routeData = linesContext.actions.getRouteDataById(routeId);
			if (!routeData) return;
			setDataRoutesState(prev => [...prev, routeData]);
		});
	}, [dataLineState, linesContext.data.routes]);

	useEffect(() => {
		(async () => {
			try {
				if (!dataLineState) return;
				const fetchPromises = dataLineState.pattern_ids.map((patternId) => {
					return fetch(`${Routes.API}/patterns/${patternId}`)
						.then(response => response.json())
						.then((patternData) => {
							return patternData.map((patternGroup) => {
								patternGroup.path = patternGroup.path.map((waypoint) => {
									const stopData = stopsContext.actions.getStopById(waypoint.stop_id);
									if (!stopData) return waypoint;
									return { ...waypoint, stop: stopData };
								});
								return patternGroup;
							});
						});
				});
				const resultData = await Promise.all(fetchPromises);
				setDataAllPatternsState(resultData);
			}
			catch (error) {
				console.error('Error fetching pattern data:', error);
			}
		})();
	}, [dataLineState, stopsContext.data.stops]);

	/**
	 * TASK: Fetch shape data for the active pattern.
	 * WHEN: The `dataActivePatternState` changes.
	 */
	useEffect(() => {
		if (!dataActivePatternState) return;
		(async () => {
			try {
				const shapeData = await fetch(`${Routes.API}/shapes/${dataActivePatternState.shape_id}`).then((response) => {
					if (!response.ok) console.log(`Failed to fetch shape data for shapeId: ${dataActivePatternState.shape_id}`);
					else return response.json();
				});
				if (shapeData) {
					shapeData.geojson = {
						...shapeData.geojson,
						properties: {
							color: dataActivePatternState.color,
							text_color: dataActivePatternState.text_color,
						},
					};
				}
				setDataActiveShapeState(shapeData);
			}
			catch (error) {
				console.error('Error fetching shape data:', error);
			}
		})();
	}, [dataActivePatternState]);

	//
	// C. Transform data

	useEffect(() => {
		if (!dataAllPatternsState || !operationalDayContext.data.selected_day) return;
		const activePatterns: Pattern[] = [];
		for (const pattern of dataAllPatternsState) {
			for (const patternGroup of pattern) {
				const selected_date = operationalDayContext.data.selected_day;
				if (!selected_date) return;
				// Find the closest valid date
				const closestDate = patternGroup.valid_on.reduce((acc, curr) => {
					if (selected_date <= curr && (acc === '' || curr < acc)) return curr;
					return acc;
				}, '');
				// If the closest date is valid, add the pattern group to the list
				if (closestDate != '' && !activePatterns.find(activePattern => activePattern.id === patternGroup.id)) {
					activePatterns.push(patternGroup);
				}
			}
		}
		const sortedPatterns = activePatterns.sort((a, b) => a.id.localeCompare(b.id));
		setDataValidPatternsState(sortedPatterns);
	}, [dataAllPatternsState, operationalDayContext.data.selected_day]);

	useEffect(() => {
		if (!alertsContext.data.simplified) return;
		const activeAlerts = alertsContext.data.simplified.filter((simplifiedAlertData) => {
			return simplifiedAlertData.informed_entity.some((informedEntity) => {
				// Skip if no routeId and no stopId in line
				if (!informedEntity.route_id) return false;
				// Check if the alert is active and has a matching route
				const hasMatchingRoute = dataLineState?.route_ids.includes(informedEntity.route_id || '');
				const isActive = simplifiedAlertData.end_date ? simplifiedAlertData.end_date >= new Date() : true;
				return hasMatchingRoute && isActive;
			});
		});
		setDataActiveAlertsState(activeAlerts);
	}, [alertsContext.data.simplified, dataLineState, lineId]);

	//
	// D. Handle actions

	/**
	 * Preselect a Pattern if there is no filter value.
	 * Return otherwise.
	 */
	useEffect(() => {
		// Return early if no patterns are available
		if (!dataValidPatternsState || !dataValidPatternsState.length) return;
		// Preselect the first pattern of the valid patterns if there is no filter value
		if (!filterActivePatternIdState) {
			setActivePattern(dataValidPatternsState[0].version_id);
		}
	}, [dataValidPatternsState, filterActivePatternIdState]);

	/**
	 * Activate a given Pattern based on the filter value for active_pattern_id.
	 * This runs everytime the filter changes.
	 */
	useEffect(() => {
		// Return early if no patterns are available or no filter value for active_pattern_id
		if (!dataValidPatternsState || !filterActivePatternIdState) return;
		// If there is a filter value for active pattern, set the pattern with that ID
		const foundActivePatternData = dataValidPatternsState.find(activePattern => activePattern.id === filterActivePatternIdState);
		if (!foundActivePatternData) return;
		setDataActivePatternState(foundActivePatternData);
		//
	}, [dataValidPatternsState, filterActivePatternIdState]);

	/**
	 * Preselect a Waypoint if there is no filter value.
	 * Return otherwise.
	 */
	useEffect(() => {
		// Return early if there is no active pattern
		if (!dataActivePatternState) return;
		// Preselect the first waypoint of the active pattern if there is no filter value
		if (!filterActiveWaypointStopIdState) {
			if (!dataActivePatternState.path.length) return;
			const firstStopId = dataActivePatternState.path[0].stop_id;
			const firstStopSequence = dataActivePatternState.path[0].stop_sequence;
			setActiveWaypoint(firstStopId, firstStopSequence, false);
		}
	}, [dataActivePatternState, filterActiveWaypointStopIdState, filterActiveWaypointStopSequenceState]);

	/**
	 * Activate a given Waypoint based on the filter value for active_stop_id and active_stop_sequence.
	 * This runs everytime the filter changes.
	 */
	useEffect(() => {
		// Return early if no patterns are available or no filter value for active_stop_id and active_stop_sequence
		if (!dataActivePatternState || !filterActiveWaypointStopIdState) return;
		// If there is a filter value for active_stop_id AND active_stop_sequence, then set the waypoint with that id AND sequence
		if (filterActiveWaypointStopIdState && filterActiveWaypointStopSequenceState) {
			const foundWaypointData = dataActivePatternState.path.find(waypoint => waypoint.stop_id === filterActiveWaypointStopIdState && waypoint.stop_sequence === Number(filterActiveWaypointStopSequenceState));
			if (foundWaypointData) {
				setDataActiveWaypointState(foundWaypointData);
				setFilterActiveWaypointStopIdState(foundWaypointData.stop_id);
				setFilterActiveWaypointStopSequenceState(String(foundWaypointData.stop_sequence));
				return;
			}
		}
		// We purposely do not try to match only by stop_id or stop_sequence since it probably will not make sense to the user.
		// The first stop of the pattern _0 is completely different from the first stop of the pattern _1, but matches the stop_id.
		// In this case, we should reset the filter values and the active waypoint.
		setDataActiveWaypointState(null);
		setFilterActiveWaypointStopIdState(null);
		setFilterActiveWaypointStopSequenceState(null);
		//
	}, [dataActivePatternState, filterActiveWaypointStopIdState, filterActiveWaypointStopSequenceState]);

	/**
	 * Set the active pattern based on the pattern version id.
	 * @param patternVersionId
	 * @returns
	 */
	const setActivePattern = (patternVersionId: string) => {
		// Return early if there are no valid patterns
		if (!dataValidPatternsState) return;
		// Find the pattern data that matches the pattern version id
		const foundPatternData = dataValidPatternsState.find(validPattern => validPattern.version_id === patternVersionId);
		// Update the state
		if (foundPatternData) {
			setFilterActivePatternIdState(foundPatternData.id);
			setFlagIsInteractiveModeState(false);
		}
	};

	/**
	 * Set the active waypoint based on the stop id and stop sequence.
	 * Optionally reset the interactive mode.
	 * @param stopId
	 * @param stopSequence
	 * @param isInteractive
	 * @returns
	 */
	const setActiveWaypoint = (stopId: string, stopSequence: number, isInteractive = true) => {
		// Return early if active waypoint is already selected
		if (dataActiveWaypointState?.stop_id === stopId && dataActiveWaypointState?.stop_sequence === stopSequence) return;
		// Find the waypoint in the active pattern that matches the stop id and stop sequence
		const foundWaypoint = dataActivePatternState?.path.find(waypoint => waypoint.stop_id === stopId && waypoint.stop_sequence === stopSequence);
		// Update the state
		if (foundWaypoint) {
			setFilterActiveWaypointStopIdState(foundWaypoint.stop_id);
			setFilterActiveWaypointStopSequenceState(String(foundWaypoint.stop_sequence));
			setFlagIsInteractiveModeState(isInteractive);
		}
	};

	/**
	 * Set the highlighted trip ids.
	 * @param tripIds
	 * @returns
	 */
	const setHighlightedTripIds = (tripIds: string[]) => {
		if (tripIds === dataHighlightedTripIdsState) setDataHighlightedTripIdsState(null);
		else setDataHighlightedTripIdsState(tripIds);
	};

	//
	// E. Define context value

	const contextValue: LinesDetailContextState = {
		actions: {
			setActivePattern,
			setActiveWaypoint,
			setHighlightedTripIds,
		},
		data: {
			active_alerts: dataActiveAlertsState,
			active_pattern: dataActivePatternState,
			active_shape: dataActiveShapeState,
			active_waypoint: dataActiveWaypointState,
			all_patterns: dataAllPatternsState,
			demand_metrics: dataDemandMetricsState,
			highlighted_trip_ids: dataHighlightedTripIdsState,
			line: dataLineState,
			routes: dataRoutesState,
			service_metrics: dataServiceMetricsState,
			valid_patterns: dataValidPatternsState,
		},
		filters: {
			active_pattern_id: filterActivePatternIdState,
			active_waypoint_stop_id: filterActiveWaypointStopIdState,
			active_waypoint_stop_sequence: filterActiveWaypointStopSequenceState,
		},
		flags: {
			is_favorite: flagIsFavoriteState,
			is_interactive_mode: flagIsInteractiveModeState,
			is_loading: linesContext.flags.is_loading || stopsContext.flags.is_loading || dataRoutesState === null || dataAllPatternsState === null,
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
