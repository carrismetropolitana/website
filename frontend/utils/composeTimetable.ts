import { PatternGroup } from '@/types/lines.types';
import { TimetableDayStop } from '@/types/timetables.types';

/**
 *
 * @param patternGroups usually linesSingleContext.data.valid_pattern_groups
 * @param stopId Stop id for which we want to compose the timetable
 * @param mainPatternId Pattern id for which we should not add exceptions
 *
 */
export default function composeTimetable(patternGroups: PatternGroup[], stopId: string, stopSequence: number, mainPatternId: string, date: Date): TimetableDayStop {
	// Format date
	const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;

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
			if (!trip.dates.includes(formattedDate)) {
				return;
			}
			trip.schedule.forEach((schedule) => {
				if (schedule.stop_id !== stopId && schedule.stop_sequence !== stopSequence) {
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
				if (patternGroup.pattern_id === mainPatternId) {
					const minuteEntry = hourEntry.minutes.find(m => m.min === minute && m.exceptions_ids === undefined);
					if (!minuteEntry) {
						hourEntry.minutes.push({ min: minute });
					}
				}

				if (patternGroup.pattern_id !== mainPatternId) {
					const minuteEntry = hourEntry.minutes.find(m => m.min === minute && m.exceptions_ids !== undefined);
					let existingException = timetableDayStop.exceptions.find(ex => ex.pattern_id === patternGroup.pattern_id);
					const exceptionId = existingException ? existingException.exception_id : getExceptionId();
					if (!existingException) {
						existingException = {
							calendar_desc: null,
							exception_id: exceptionId,
							pattern_headsign: patternGroup.headsign,
							pattern_id: patternGroup.pattern_id,
							trip_ids: [],
							type: 'variant',
						};
						timetableDayStop.exceptions.push(existingException);
					}
					for (const tripId of trip.trip_ids) {
						if (!existingException.trip_ids.includes(tripId)) {
							existingException.trip_ids.push(tripId);
						}
					}
					if (minuteEntry) {
						if (!minuteEntry.exceptions_ids?.includes(exceptionId)) {
							if (!minuteEntry.exceptions_ids) {
								console.log('minuteEntry.exceptions_ids is undefined');
							}
							minuteEntry.exceptions_ids?.push(exceptionId);
						}
					}
					else {
						hourEntry.minutes.push({ exceptions_ids: [exceptionId], min: minute });
					}
				}
			});
		});
	});

	// Sort the hours and minutes
	timetableDayStop.hours.sort((a, b) => a.hour - b.hour);
	timetableDayStop.hours.forEach((hour) => {
		hour.minutes.sort((a, b) => {
			const diff = a.min - b.min;
			// Make sure the main pattern comes first if there are 2 entries in the same minute
			return diff !== 0 ? diff : (a.exceptions_ids?.length ?? 0) - (b.exceptions_ids?.length ?? 0);
		});
	});

	return timetableDayStop;
}
