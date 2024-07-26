/* * */

import SelectDate from '@/components/common/SelectDate';
import Timetable from '@/components/common/Timetable';
import { Pattern, Stop } from '@/utils/types';
import { Drawer } from '@mantine/core';
import { useState } from 'react';

/* * */

export default function Component(
	{ date, open, pattern, setOpen, stop, stopSequence }:
	{ date: Date, open: boolean, pattern: Pattern, setOpen: (open: boolean) => void, stop: Stop, stopSequence: number }) {
	//

	//
	// A. Setup variables

	const [innerDate, setInnerDate] = useState(date);

	return (
		<Drawer
			onClose={() => setOpen(false)}
			opened={open}
			position="bottom"
			radius="md"
			title={pattern.headsign}
		>
			<SelectDate setDate={setInnerDate} value={innerDate} />
			<Timetable date={innerDate} pattern={pattern} stop={stop} stopSequence={stopSequence} />

		</Drawer>
	);

	//
}
