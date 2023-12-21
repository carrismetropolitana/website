/* * */

export default function useStopLocation(stopData) {
  //

  // If none of the location strings are defined
  if (!stopData || (!stopData.locality && !stopData.municipality)) return null;

  // If only locality is defined, then return it.
  if (stopData.locality && !stopData.municipality_name) return stopData.locality;

  // If only municipality is defined, then return it.
  if (!stopData.locality && stopData.municipality_name) return stopData.municipality_name;

  // If both locality and municipality are the same,
  // return only one of them to avoid duplicate strings.
  if (stopData.locality === stopData.municipality_name) return stopData.locality;

  // Return both if none of the previous conditions was matched.
  return `${stopData.locality}, ${stopData.municipality_name}`;

  //
}
