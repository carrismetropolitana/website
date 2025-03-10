/* * */

import { type ExtendedStop } from '@/contexts/Stops.context';
import { type Locality, type Municipality } from '@carrismetropolitana/api-types/locations';
import { type Stop } from '@carrismetropolitana/api-types/network';

/* * */

export interface ExtendStopsWorkerData {
	localities: Locality[]
	municipalities: Municipality[]
	stops: Stop[]
}

/* * */

self.addEventListener('message', (event: MessageEvent<ExtendStopsWorkerData>) => {
	//

	//
	// Extract data from event message

	const localitiesData = event.data.localities;
	const municipalitiesData = event.data.municipalities;
	const stopsData = event.data.stops;

	//
	// Perform data preparation

	const extendedStopsData: ExtendedStop[] = stopsData.map((stop) => {
		// Extend data for search function
		const municipality = municipalitiesData.find(municipality => municipality.id === stop.municipality_id);
		const locality = localitiesData.find(location => location.id === stop.locality_id);
		// Return extended data
		return {
			...stop,
			locality_name: locality ? locality.name : undefined,
			municipality_name: municipality ? municipality.name : undefined,
		};
	});

	//
	// Post message back to the main thread

	self.postMessage(extendedStopsData);

	//
});

//
