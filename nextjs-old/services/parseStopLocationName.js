//

export default function parseStopLocationName(locality, municipality) {
	//

	// If none of the location strings are defined, then return null.
	if (!locality && !municipality) return null;

	// If only locality is defined, then return it.
	if (locality && !municipality) return locality;

	// If only municipality is defined, then return it.
	if (!locality && municipality) return municipality;

	// If both locality and municipality are the same,
	// return only one of them to avoid duplicate strings.
	if (locality === municipality) return locality;

	// Return both if none of the previous conditions were matched.
	return `${locality}, ${municipality}`;

	//
}
