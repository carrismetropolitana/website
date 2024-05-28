/* * */
/* PARSE TIME STRING TO DATE */
/* Explanation needed. */
/* * */

export default function parseTimeStringToDate(timeString = '' /* HH:MM:DD */) {
  if (!timeString.length === 8) return null;
  // Extract hours, minutes, and seconds from the string
  const timeStringParts = timeString.split(':');
  const hours = parseInt(timeStringParts[0]);
  const minutes = parseInt(timeStringParts[1]);
  const seconds = parseInt(timeStringParts[2]);
  // Create a new Date object with the extracted components
  const dateObject = new Date()
  dateObject.setHours(hours);
  dateObject.setMinutes(minutes);
  dateObject.setSeconds(seconds);
  // Create a new Date object with the extracted components
  return dateObject;
}
