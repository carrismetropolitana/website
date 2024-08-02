'use client';

/* * */

import '@mantine/carousel/styles.layer.css';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/charts/styles.css';

/* * */

import SegmentedControlOverride from '@/styles/overrides/SegmentedControl.module.css';
import SelectOverride from '@/styles/overrides/Select.module.css';
import SkeletonOverride from '@/styles/overrides/Skeleton.module.css';
import TextInputOverride from '@/styles/overrides/TextInput.module.css';
import { SegmentedControl, Select, Skeleton, TextInput, createTheme } from '@mantine/core';

/* * */

const combineClasses = (defaultClasses, customClasses) => {
	const customClasesString = customClasses.join(' ');
	return Object.entries(defaultClasses).reduce((acc, [key, value]) => {
		acc[key] = `${value} ${customClasesString}`;
		return acc;
	}, {});
};

/* * */

export const theme = createTheme({
	//

	components: {

		SegmentedControl: SegmentedControl.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					indicator: SegmentedControlOverride.indicator,
					label: SegmentedControlOverride.label,
					root: SegmentedControlOverride.root,
				};
				if (props.variant === 'white') {
					defaultClasses = combineClasses(defaultClasses, [SegmentedControlOverride.variantWhite]);
				}
				return defaultClasses;
			},
		}),

		Select: Select.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					dropdown: SelectOverride.dropdown,
					input: SelectOverride.input,
					option: SelectOverride.option,
					section: SelectOverride.section,
					wrapper: SelectOverride.wrapper,
				};
				return defaultClasses;
			},
		}),

		Skeleton: Skeleton.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					root: SkeletonOverride.root,

				};
				return defaultClasses;
			},
		}),

		TextInput: TextInput.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					input: TextInputOverride.input,
					section: TextInputOverride.section,
					wrapper: TextInputOverride.wrapper,
				};
				if (props.variant === 'white') {
					defaultClasses = combineClasses(defaultClasses, [TextInputOverride.variantWhite]);
				}
				return defaultClasses;
			},
		}),

	},

	fontFamily: 'var(--font-inter)',

	//
});
