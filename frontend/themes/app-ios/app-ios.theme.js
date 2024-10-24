'use client';

/* * */

import defaultTheme from '@/themes/_default/default.theme';
import ButtonOverride from '@/themes/app-android/overrides/Button.module.css';
import combineClasses from '@/utils/combineClasses';
import { createTheme } from '@mantine/core';
import { Button } from '@mantine/core';

/* * */

export const appIosTheme = createTheme({
	//

	components: {

		...defaultTheme.components,

		Button: Button.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					inner: ButtonOverride.inner,
					label: ButtonOverride.label,
					root: ButtonOverride.root,
					section: ButtonOverride.section,
				};
				if (props.variant === 'primary') {
					defaultClasses = combineClasses(defaultClasses, [ButtonOverride.variantPrimary]);
				}
				if (props.variant === 'secondary') {
					defaultClasses = combineClasses(defaultClasses, [ButtonOverride.variantSecondary]);
				}
				if (props.variant === 'muted') {
					defaultClasses = combineClasses(defaultClasses, [ButtonOverride.variantMuted]);
				}
				if (props.variant === 'danger') {
					defaultClasses = combineClasses(defaultClasses, [ButtonOverride.variantDanger]);
				}
				if (props.variant === 'disabled') {
					defaultClasses = combineClasses(defaultClasses, [ButtonOverride.variantDisabled]);
				}
				return defaultClasses;
			},
		}),

	},

	//
});
