'use client';

/* * */

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

// 1.
// SETUP INITIAL STATE

const initialMapState = {
	auto_zoom: null,
	selected_coordinates: null,
	selected_feature: null,
	style: 'map',
};

const initialEntitiesState = {
	pattern: null,
	pattern_id: null,
	shape: null,
	shape_id: null,
	//
	stop: null,
	trip: null,
	trip_id: null,
	vehicle: null,
	vehicle_id: null,
};

/* * */

// 2.
// CREATE CONTEXTS

const FrontendStopsContext = createContext(null);

/* * */

// 3.
// SETUP CUSTOM HOOKS

export function useFrontendStopsContext() {
	return useContext(FrontendStopsContext);
}

/* * */

// 4.
// SETUP PROVIDER

export function FrontendStopsContextProvider({ children }) {
	//

	//
	// A. Setup state

	const [mapState, setMapState] = useState(initialMapState);
	const [entitiesState, setEntitiesState] = useState(initialEntitiesState);

	//
	// B. Fetch data

	const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

	//
	// C. Supporting functions

	const updateWindowUrl = (stopId = 'all', stopName = 'Carris Metropolitana') => {
		let newUrl = `/stops/${stopId}`;
		// TODO:
		// Refactor to correctly parse the location path
		if (window.location.pathname.includes('mupi')) newUrl = `/mupi${newUrl}`;
		// :TODO
		window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
		document.title = stopName;
	};

	//
	// D. Setup actions

	const updateMapState = useCallback(
		(newMapState, reset = false) => {
			if (reset) setMapState({ ...initialMapState, ...newMapState });
			else setMapState({ ...mapState, ...newMapState });
		},
		[mapState],
	);

	const updateEntities = useCallback(
		(newEntitiesState, reset = false) => {
			if (reset) setEntitiesState({ ...initialEntitiesState, ...newEntitiesState });
			else setEntitiesState({ ...entitiesState, ...newEntitiesState });
		},
		[entitiesState],
	);

	// --------

	const setSelectedCoordinates = useCallback((newCoordinates) => {
		setEntitiesState(initialEntitiesState);
		setMapState(prev => ({ ...prev, selected_coordinates: newCoordinates, selected_feature: null }));
	}, []);

	const setSelectedFeature = useCallback((newFeature) => {
		setMapState(prev => ({ ...prev, selected_coordinates: null, selected_feature: newFeature }));
	}, []);

	const disableAutoZoom = useCallback(() => {
		setMapState(prev => ({ ...prev, auto_zoom: false }));
	}, []);

	// --------

	const selectStop = useCallback(
		(stopId) => {
			const foundStop = allStopsData.find(item => item.id === stopId);
			if (foundStop) {
				setMapState(prev => ({ ...prev, auto_zoom: true, selected_coordinates: null, selected_feature: null }));
				setEntitiesState({ ...initialEntitiesState, stop: foundStop });
				updateWindowUrl(stopId, foundStop.name);
			}
		},
		[allStopsData],
	);

	const clearSelectedStop = useCallback(() => {
		setEntitiesState(initialEntitiesState);
		updateWindowUrl();
	}, []);

	// --------

	const selectTrip = useCallback((tripData) => {
		setEntitiesState(prev => ({ ...prev, trip: tripData }));
	}, []);

	const clearSelectedTrip = useCallback(() => {
		setEntitiesState(prev => ({ ...initialEntitiesState, stop: prev.stop }));
	}, []);

	//
	// E. Setup context object

	const contextObject = useMemo(
		() => ({
			clearSelectedStop,
			clearSelectedTrip,
			disableAutoZoom,
			//
			entities: entitiesState,
			//
			map: mapState,
			//
			selectStop,
			//
			selectTrip,
			setSelectedCoordinates,
			setSelectedFeature,
			updateEntities,
			updateMap: updateMapState,
		}),
		[mapState, updateMapState, setSelectedCoordinates, setSelectedFeature, disableAutoZoom, entitiesState, updateEntities, selectStop, clearSelectedStop, selectTrip, clearSelectedTrip],
	);

	//
	// D. Return provider

	return <FrontendStopsContext.Provider value={contextObject}>{children}</FrontendStopsContext.Provider>;

	//
}
