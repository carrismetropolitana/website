import { PatternGroup } from '@/types/lines.types';
import { TimetableDayStop } from '@/types/timetables.types';

/**
 *
 * @param patternGroups usually linesSingleContext.data.valid_pattern_groups
 * @param stopId Stop id for which we want to compose the timetable
 * @param mainPatternId Pattern id for which we should not add exceptions
 *
 */
export default function composeTimetable(patternGroups: PatternGroup[], stopId: string, mainPatternId: string): TimetableDayStop {
	// Initialize an empty object to store the final timetable
	const timetableDayStop: TimetableDayStop = {
		exceptions: [],
		hours: [],
	};

	// Track the current exception index to generate sequential letters
	let exceptionIndex = 0;

	// Helper function to convert time string "HH:MM:SS" to an hour number and minute number
	const parseTime = (time: string) => {
		const [hour, minute] = time.split(':').map(Number);
		return { hour, minute };
	};

	// Helper function to get the exception id as a letter
	const getExceptionId = () => {
		const exceptionId = String.fromCharCode(97 + exceptionIndex); // 'a' is 97 in ASCII
		exceptionIndex = (exceptionIndex + 1) % 26; // Loop back to 'a' after 'z'
		return exceptionId;
	};

	// Loop through each pattern group in the pattern data
	patternGroups.forEach((patternGroup) => {
		patternGroup.trips.forEach((trip) => {
			trip.schedule.forEach((schedule) => {
				if (schedule.stop_id !== stopId) {
					return;
				}
				// Parse arrival time
				const { hour, minute } = parseTime(schedule.arrival_time_24h);

				// Find or create the hour entry in the timetable
				let hourEntry = timetableDayStop.hours.find(h => h.hour === hour);
				if (!hourEntry) {
					hourEntry = { hour, minutes: [] };
					timetableDayStop.hours.push(hourEntry);
				}

				// Add the minute entry with exception_ids if not already present
				let minuteEntry = hourEntry.minutes.find(m => m.min === minute);
				if (!minuteEntry) {
					minuteEntry = { exceptions_ids: [], min: minute };
					hourEntry.minutes.push(minuteEntry);
				}

				// If the pattern is the main pattern, skip adding exceptions
				if (patternGroup.pattern_id === mainPatternId) {
					return;
				}

				const existingException = timetableDayStop.exceptions.find(ex => ex.pattern_id === patternGroup.pattern_id);

				if (existingException) {
					for (const tripId of trip.trip_ids) {
						if (!existingException.trip_ids.includes(tripId)) {
							existingException.trip_ids.push(tripId);
						}
					}
				}

				// Generate an exception ID only if it doesn't already exist for the pattern_id
				const exceptionId = existingException ? existingException.exception_id : getExceptionId();
				// Add the exception ID to the minute entry
				if (!minuteEntry.exceptions_ids.includes(exceptionId)) {
					minuteEntry.exceptions_ids.push(exceptionId);
				}

				if (!existingException) {
					// Add exception data
					// TODO add the 'schedule' type
					const exceptionType = 'variant';
					const calendarDesc = null;

					timetableDayStop.exceptions.push({
						calendar_desc: calendarDesc,
						exception_id: exceptionId,
						pattern_headsign: patternGroup.headsign,
						pattern_id: patternGroup.pattern_id,
						trip_ids: trip.trip_ids,
						type: exceptionType,
					});
				}
			});
		});
	});

	// Sort the hours and minutes
	timetableDayStop.hours.sort((a, b) => a.hour - b.hour);
	timetableDayStop.hours.forEach((hour) => {
		hour.minutes.sort((a, b) => a.min - b.min);
	});

	return timetableDayStop;
}
