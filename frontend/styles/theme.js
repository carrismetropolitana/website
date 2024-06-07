'use client';

/* * */

import '@mantine/carousel/styles.layer.css';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';

/* * */

import SegmentedControlOverride from '@/styles/overrides/SegmentedControl.module.css';
import { SegmentedControl, createTheme } from '@mantine/core';

/* * */

export const theme = createTheme({
	//

	components: {
		SegmentedControl: SegmentedControl.extend({
			classNames: {
				indicator: SegmentedControlOverride.indicator,
				label: SegmentedControlOverride.label,
				root: SegmentedControlOverride.root,
			},
		}),
	},

	fontFamily: 'var(--font-inter)',

	//
});
