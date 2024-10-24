/* * */

import { SelectOperationalDay } from '@/components/common/SelectOperationalDay';
// import Timetable from '@/components/common/Timetable';
import { PatternGroup } from '@/types/lines.types';
import { Stop } from '@/types/stops.types';
import { Drawer } from '@mantine/core';

/* * */

export default function Component(
	{ open, pattern, setOpen }:
	{ date: Date, open: boolean, pattern: PatternGroup, setOpen: (open: boolean) => void, stop: Stop, stopSequence: number }) {
	//

	//
	// A. Setup variables

	return (
		<Drawer
			onClose={() => setOpen(false)}
			opened={open}
			position="bottom"
			radius="md"
			title={pattern.headsign}
		>
			<SelectOperationalDay />
			{/* <Timetable date={innerDate} pattern={pattern} stop={stop} stopSequence={stopSequence} /> */}

		</Drawer>
	);

	//
}
