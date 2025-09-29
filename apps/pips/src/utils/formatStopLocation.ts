/**
 *
 * @param locality Optional locality string for the stop.
 * @param municipality Optional municipality string for the stop.
 * @returns A string with the location of the stop, formatted as "locality, municipality" if both are defined, or just "locality" or "municipality" if only one is defined.
 */

export function formatStopLocation(locality?: string, municipality?: string): string | undefined {
	//

	// If none of the location strings are defined, then return null.
	if (!locality && !municipality) return;

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
