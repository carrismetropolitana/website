/* * */

import type { PatternGroup, Route } from '@/types/lines.types';
import type { Timetable } from '@/types/timetables.types';

/* * */

/**
 * This function creates a timetable for a set of patterns of a line, for a specific stop and date.
 * Please explore the Timetable type to understand the structure of the resulting object. *
 *
 * @param primaryPatternGroup The primary pattern group of the timetable.
 * @param secondaryPatternGroups Other patterns used to extend the timetable with more data.
 * @param mentionedRoutes Parent Routes for the used patterns, used to display the route name in the exceptions.
 * @param stopId The Stop ID for which the timetable will be composed.
 * @param stopSequence The Stop sequence for which the timetable will be composed.
 * @param operationalDay The day for which the timetable will be composed.
 * @returns The timetable for the given patterns and stop.
 */
export default function createTimetable(primaryPatternGroup: PatternGroup, secondaryPatternGroups: PatternGroup[], mentionedRoutes: Route[], stopId: string, stopSequence: number, operationalDay: string): Timetable {
	//

	// 1.
	// Setup the necessary variables to track progress,
	// as well as the empty timetable to start adding data to it.

	const timetableResult: Timetable = {
		exceptions: [],
		hours: [],
	};

	// 2.
	// Extract the currently valid Pattern Group from the primary and secondary patterns.
	// To check if a pattern is valid for the given date, we need to check if the date is included in the pattern's dates array.

	const validSecondaryPatternGroups: PatternGroup[] = secondaryPatternGroups.flat().filter(patternGroup => patternGroup.valid_on.includes(operationalDay) && patternGroup.direction === primaryPatternGroup.direction);

	// 3.
	// Create the timetable for the primary pattern first

	primaryPatternGroup.trips.forEach((trip) => {
		// Check if the trip is valid for the given operational day
		if (!trip.dates.includes(operationalDay)) return;
		// Find the schedule for the given Stop ID and Stop Sequence
		trip.schedule.forEach((schedule) => {
			// Skip if the schedule is not for the given stop and sequence combination
			if (schedule.stop_id !== stopId || schedule.stop_sequence !== stopSequence) return;
			// Extract the hour and minute from the arrival time in 24h format
			const [hourValue, minuteValue] = schedule.arrival_time.split(':').map(Number);
			const [hour24, minute24] = schedule.arrival_time_24h.split(':').map(timeComponent => String(Number(timeComponent)).padStart(2, '0'));
			// Find or create the hour entry in the timetable
			let hourEntry = timetableResult.hours.find(h => h.hour_value === hourValue);
			if (!hourEntry) {
				hourEntry = { hour_label: hour24, hour_value: hourValue, minutes: [] };
				timetableResult.hours.push(hourEntry);
			}
			// Find or create the minute entry in the timetable
			// Since we're processing the primary Pattern, ensure that the minute entry does not have any exceptions.
			const minuteEntry = hourEntry.minutes.find(m => m.minute_value === minuteValue && m.exception_ids === undefined);
			if (!minuteEntry) {
				hourEntry.minutes.push({ exception_ids: [], minute_label: minute24, minute_value: minuteValue });
			}
		});
	});

	// 4.
	// Extend the timetable for any secondary patterns that are valid for the given operational day

	validSecondaryPatternGroups.forEach((patternGroup) => {
		// For each trip in the pattern group
		patternGroup.trips.forEach((trip) => {
			// Check if the trip is valid for the given operational day
			if (!trip.dates.includes(operationalDay)) return;
			// Find the schedule for the given Stop ID and Stop Sequence
			trip.schedule.forEach((schedule) => {
				// Skip if the schedule is not for the given stop and sequence combination
				if (schedule.stop_id !== stopId || schedule.stop_sequence !== stopSequence) return;
				// Extract the hour and minute from the arrival time in 24h format
				const [hourValue, minuteValue] = schedule.arrival_time.split(':').map(Number);
				const [hour24, minute24] = schedule.arrival_time_24h.split(':').map(timeComponent => String(Number(timeComponent)).padStart(2, '0'));
				// Find or create the hour entry in the timetable
				let hourEntry = timetableResult.hours.find(h => h.hour_value === hourValue);
				if (!hourEntry) {
					hourEntry = { hour_label: hour24, hour_value: hourValue, minutes: [] };
					timetableResult.hours.push(hourEntry);
				}
				// Find or create the minute entry in the timetable
				const minuteEntry = hourEntry.minutes.find(m => m.minute_value === minuteValue && m.exception_ids === undefined);
				// Since we're processing secondary Patterns, we have to reuse or create exceptions for each minute entry.
				let existingException = timetableResult.exceptions.find(exception => exception.pattern_id === patternGroup.pattern_id);
				// Create a new exception if it doesn't exist yet
				if (!existingException) {
					const mentionedRoute = mentionedRoutes.find(route => route.route_id === patternGroup.route_id);
					existingException = {
						exception_id: String.fromCharCode(97 + timetableResult.exceptions.length), // 'a' is 97 in ASCII
						pattern_group_id: patternGroup.pattern_group_id,
						pattern_headsign: patternGroup.headsign,
						pattern_id: patternGroup.pattern_id,
						route_long_name: mentionedRoute?.long_name ?? '-',
						type: 'variant',
					};
					timetableResult.exceptions.push(existingException);
				}
				// Create a new minute entry if it doesn't exist yet
				if (!minuteEntry) {
					hourEntry.minutes.push({ exception_ids: [existingException.exception_id], minute_label: minute24, minute_value: minuteValue });
				}
				// If the minute entry already exists, add the exception ID to it
				else {
					minuteEntry.exception_ids.push(existingException.exception_id);
				}
			});
		});
	});

	// 5.
	// Sort the timetable to ensure the hours and minutes are in ascending order counting from 04:00

	timetableResult.hours.sort((a, b) => a.hour_value - b.hour_value);
	timetableResult.hours.forEach((hour) => {
		hour.minutes.sort((a, b) => {
			const diff = a.minute_value - b.minute_value;
			// Make sure the main pattern comes first if there are 2 entries in the same minute
			return diff !== 0 ? diff : (a.exception_ids.length ?? 0) - (b.exception_ids.length ?? 0);
		});
	});

	// 6.
	// Finish the function by returning the composed timetable

	return timetableResult;

	//
}
