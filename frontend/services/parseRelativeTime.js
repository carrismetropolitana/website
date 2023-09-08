export default function parseRelativeTime(eta) {
  // Skip if no eta
  if (!eta) return null;

  // Get current time
  var now = new Date();
  var currentHours = now.getHours();
  var currentMinutes = now.getMinutes();
  var currentSeconds = now.getSeconds();

  // Parse ETA
  var parts = eta.split(':');
  var etaHours = parseInt(parts[0]);
  var etaMinutes = parseInt(parts[1]);
  var etaSeconds = parseInt(parts[2]);

  // Calculate time difference
  var diffHours = etaHours - currentHours;
  var diffMinutes = etaMinutes - currentMinutes;
  var diffSeconds = etaSeconds - currentSeconds;

  // Convert time difference into minutes
  var totalDiffMinutes = diffHours * 60 + diffMinutes + diffSeconds / 60;

  // Calculate the relative time as a Date object
  var relativeTime = new Date();
  relativeTime.setMinutes(relativeTime.getMinutes() + totalDiffMinutes);
  return relativeTime;

  //
}

export function convertOperationTimeStringToDate(timeString) {
  // Skip if no timeString
  if (!timeString) return null;

  // Get current time
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  // Parse ETA
  const parts = timeString.split(':');
  const timeStringHours = parseInt(parts[0]);
  const timeStringMinutes = parseInt(parts[1]);
  const timeStringSeconds = parseInt(parts[2]);

  // Calculate time difference
  const diffHours = timeStringHours - currentHours;
  const diffMinutes = timeStringMinutes - currentMinutes;
  const diffSeconds = timeStringSeconds - currentSeconds;

  // Convert time difference into minutes
  const totalDiffMinutes = diffHours * 60 + diffMinutes + diffSeconds / 60;

  // Calculate the relative time as a Date object
  const relativeTime = new Date();
  relativeTime.setMinutes(relativeTime.getMinutes() + totalDiffMinutes);
  return relativeTime;

  //
}

export function getMinutesFromOperationTimeString(timeString) {
  // Skip if no timeString
  if (!timeString) return null;

  // Get current time
  const now = new Date();
  let currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  if (currentHours < 4) currentHours += 24;

  // Parse ETA
  const parts = timeString.split(':');
  const timeStringHours = parseInt(parts[0]);
  const timeStringMinutes = parseInt(parts[1]);
  const timeStringSeconds = parseInt(parts[2]);

  // Calculate time difference
  const diffHours = timeStringHours - currentHours;
  const diffMinutes = timeStringMinutes - currentMinutes;
  const diffSeconds = timeStringSeconds - currentSeconds;

  // Convert time difference into minutes
  return diffHours * 60 + diffMinutes + diffSeconds / 60;

  //
}

export function convertOperationTimeStringTo24HourTimeString(timeString) {
  //

  // Skip if no timeString
  if (!timeString) return null;

  // Split timeString into components ( HH:MM:SS -> ['HH', 'MM', 'SS'] )
  const timeStringComponents = timeString.split(':');

  // Pad the components with leading zeros ( 1:6:20 -> ['01', '06', '20'] )
  let paddedHoursComponent = timeStringComponents[0].padStart(2, '0');
  const paddedMinutesComponent = timeStringComponents[1].padStart(2, '0');
  const paddedSecondsComponent = timeStringComponents[2].padStart(2, '0');

  // Format the hours component if it is larger than 24-hour time
  if (paddedHoursComponent && Number(paddedHoursComponent) > 23) {
    const paddedHoursComponentAdjustedTo24HourTime = Number(paddedHoursComponent) - 24;
    paddedHoursComponent = String(paddedHoursComponentAdjustedTo24HourTime).padStart(2, '0');
  }

  // Return formatted time string
  return `${paddedHoursComponent}:${paddedMinutesComponent}:${paddedSecondsComponent}`;

  //
}
