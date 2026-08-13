'use client';

import { useSessionStorage } from '@mantine/hooks';

/* * */

interface SelectedTripData {
	patternId: null | string
	stopSequence: null | number
	tripId: null | string
}

interface UseSelectedTripReturnType {
	resetSelectedTrip: () => void
	selectedTripData: SelectedTripData
	setSelectedTrip: (patternId: string, tripId: string, stopSequence: number) => void
}

/**
 * A hook that provides the active bottom sheet, and a function to set it.
 * @returns An object with the active bottom sheet view and entity id, and a function to set it, and a function to close the active bottom sheet.
 */
export function useSelectedTrip(): UseSelectedTripReturnType {
	//

	//
	// A. Setup variables

	const [selectedTripData, setSelectedTripData] = useSessionStorage<SelectedTripData>({
		defaultValue: {
			patternId: null,
			stopSequence: null,
			tripId: null,
		},
		key: 'selected-trip',
	});

	//
	// B. Handle actions

	const setSelectedTrip = (patternId: string, tripId: string, stopSequence: number) => {
		const isSamePatternId = selectedTripData.patternId === patternId;
		const isSameTripId = selectedTripData.tripId === tripId;
		const isSameStopSequence = selectedTripData.stopSequence === stopSequence;
		if (isSamePatternId && isSameTripId && isSameStopSequence) resetSelectedTrip();
		else setSelectedTripData({ patternId, stopSequence, tripId });
	};

	const resetSelectedTrip = () => {
		setSelectedTripData({ patternId: null, stopSequence: null, tripId: null });
	};

	//
	// D. Return data

	return {
		resetSelectedTrip,
		selectedTripData,
		setSelectedTrip,
	};
}
