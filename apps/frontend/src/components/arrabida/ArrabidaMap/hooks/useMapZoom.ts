'use client';

/* * */

import { useMap } from '@vis.gl/react-maplibre';
import { useEffect, useState } from 'react';

/* * */

export function useMapZoom() {
	//

	//
	// A. Setup variables

	const { arrabidaMap } = useMap();
	const [zoom, setZoom] = useState(12);

	//
	// B. Handle actions

	useEffect(() => {
		if (!arrabidaMap) return;

		const updateZoom = () => {
			setZoom(arrabidaMap.getZoom());
		};

		arrabidaMap.on('zoom', updateZoom);
		updateZoom();

		return () => {
			arrabidaMap.off('zoom', updateZoom);
		};
	}, [arrabidaMap]);

	//
	// C. Return data

	return zoom;

	//
}
