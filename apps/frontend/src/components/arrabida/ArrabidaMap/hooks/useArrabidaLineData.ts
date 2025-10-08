'use client';

/* * */

import { useLinesContext } from '@/contexts/Lines.context';
import { centerMap } from '@/utils/map.utils';
import { type Pattern, type Shape } from '@carrismetropolitana/api-types/network';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { useMap } from '@vis.gl/react-maplibre';
import { useCallback, useEffect, useMemo, useState } from 'react';

/* * */

interface UseArrabidaLineDataReturn {
	actions: {
		clearSelection: () => void
		selectLine: (lineId: string) => void
	}
	data: {
		coloredShapeData?: GeoJSON.FeatureCollection | undefined
		selectedLineId: null | string
		selectedLinePattern: null | Pattern
		selectedLineShape: null | Shape
	}
	flags: {
		isLoading: boolean
	}
}

/* * */

export function useArrabidaLineData(): UseArrabidaLineDataReturn {
	//

	//
	// A. Setup variables

	const linesContext = useLinesContext();
	const { arrabidaMap } = useMap();

	const [selectedLineId, setSelectedLineId] = useState<null | string>(null);
	const [lineShapes, setLineShapes] = useState<Record<string, Shape>>({});
	const [activePatterns, setActivePatterns] = useState<Record<string, Pattern>>({});
	const [selectedLinePattern, setSelectedLinePattern] = useState<null | Pattern>(null);
	const [selectedLineShape, setSelectedLineShape] = useState<null | Shape>(null);
	const [isLoading, setIsLoading] = useState(false);

	//
	// B. Transform data

	const coloredShapeData = useMemo(() => {
		if (!selectedLineShape?.geojson || !selectedLinePattern) return undefined;

		// Clone the geojson and add color properties to each feature (for MapViewStylePath)
		const clonedGeoJson = JSON.parse(JSON.stringify(selectedLineShape.geojson));

		// Handle both FeatureCollection and single Feature cases
		if (clonedGeoJson.type === 'FeatureCollection' && clonedGeoJson.features) {
			// It's already a FeatureCollection - add color to each feature
			clonedGeoJson.features.forEach((feature: GeoJSON.Feature) => {
				feature.properties = {
					...feature.properties,
					color: selectedLinePattern.color,
					text_color: selectedLinePattern.text_color,
				};
			});
			return clonedGeoJson as GeoJSON.FeatureCollection;
		}
		else {
			// It's a single Feature - wrap it in a FeatureCollection
			const feature = clonedGeoJson as GeoJSON.Feature;
			feature.properties = {
				...feature.properties,
				color: selectedLinePattern.color,
				text_color: selectedLinePattern.text_color,
			};

			return {
				features: [feature],
				type: 'FeatureCollection' as const,
			} as GeoJSON.FeatureCollection;
		}
	}, [selectedLineShape, selectedLinePattern]);

	//
	// C. Handle actions

	const fetchLineShapeData = useCallback(async (lineId: string) => {
		if (lineShapes[lineId]) return;

		setIsLoading(true);

		try {
			const lineData = linesContext.actions.getLineDataById(lineId);
			if (!lineData?.pattern_ids?.length) return;

			const patternResponse = await fetch(`${getPublicVariable('api_url')}/patterns/${lineData.pattern_ids[0]}`);
			const patternsData = await patternResponse.json();

			if (patternsData?.[0]) {
				const pattern = patternsData[0];
				setActivePatterns(prev => ({ ...prev, [lineId]: pattern }));

				const shapeResponse = await fetch(`${getPublicVariable('api_url')}/shapes/${pattern.shape_id}`);
				const shapeData = await shapeResponse.json();

				if (shapeData) {
					setLineShapes(prev => ({ ...prev, [lineId]: shapeData }));
				}
			}
		}
		catch (error) {
			console.error('Error fetching line shape data:', error);
		}
		finally {
			setIsLoading(false);
		}
	}, [linesContext, lineShapes]);

	const selectLine = useCallback((lineId: string) => {
		setSelectedLineId(lineId);
		fetchLineShapeData(lineId);
	}, [fetchLineShapeData]);

	const clearSelection = useCallback(() => {
		setSelectedLineId(null);
		setSelectedLinePattern(null);
		setSelectedLineShape(null);
	}, []);

	useEffect(() => {
		if (selectedLineId) {
			const shape = lineShapes[selectedLineId];
			const pattern = activePatterns[selectedLineId];
			setSelectedLineShape(shape || null);
			setSelectedLinePattern(pattern || null);
		}
	}, [selectedLineId, lineShapes, activePatterns]);

	useEffect(() => {
		if (!selectedLineShape?.geojson || !arrabidaMap) return;
		centerMap(arrabidaMap, [selectedLineShape.geojson], { padding: 60 });
	}, [arrabidaMap, selectedLineShape]);

	//
	// D. Return data

	return {
		actions: {
			clearSelection,
			selectLine,
		},
		data: {
			coloredShapeData,
			selectedLineId,
			selectedLinePattern,
			selectedLineShape,
		},
		flags: {
			isLoading,
		},
	};

	//
}
