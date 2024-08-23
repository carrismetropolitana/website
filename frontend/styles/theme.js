'use client';

/* * */

import '@mantine/carousel/styles.layer.css';
import '@mantine/charts/styles.layer.css';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import 'maplibre-gl/dist/maplibre-gl.css';

/* * */

import AccordionOverride from '@/styles/overrides/Accordion.module.css';
import ButtonOverride from '@/styles/overrides/Button.module.css';
import SegmentedControlOverride from '@/styles/overrides/SegmentedControl.module.css';
import SelectOverride from '@/styles/overrides/Select.module.css';
import SkeletonOverride from '@/styles/overrides/Skeleton.module.css';
import TextInputOverride from '@/styles/overrides/TextInput.module.css';
import { Accordion, Button, SegmentedControl, Select, Skeleton, TextInput, createTheme } from '@mantine/core';
import { IconCaretLeftFilled } from '@tabler/icons-react';

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

		Accordion: Accordion.extend({
			classNames: () => {
				let defaultClasses = {
					chevron: AccordionOverride.chevron,
					content: AccordionOverride.content,
					control: AccordionOverride.control,
					icon: AccordionOverride.icon,
					item: AccordionOverride.item,
					label: AccordionOverride.label,
					root: AccordionOverride.root,
				};
				return defaultClasses;
			},
			defaultProps: {
				chevron: <IconCaretLeftFilled />,
			},
		}),

		Button: Button.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					inner: ButtonOverride.inner,
					label: ButtonOverride.label,
					root: ButtonOverride.root,
					section: ButtonOverride.section,
				};
				if (props.variant === 'pill') {
					defaultClasses = combineClasses(defaultClasses, [ButtonOverride.variantPill]);
				}
				return defaultClasses;
			},
		}),

		SegmentedControl: SegmentedControl.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					indicator: SegmentedControlOverride.indicator,
					innerLabel: SegmentedControlOverride.innerLabel,
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
			classNames: () => {
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
			classNames: () => {
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
				if (props.size === 'sm') {
					defaultClasses = combineClasses(defaultClasses, [TextInputOverride.sizeSm]);
				}
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
