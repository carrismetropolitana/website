'use client';

/* * */

import '@/themes/website/styles/reset.css';

/* * */

import defaultTheme from '@/themes/_default/default.theme';
import ButtonOverride from '@/themes/website/overrides/Button.module.css';
import combineClasses from '@/utils/combineClasses';
import { createTheme } from '@mantine/core';
import { Button } from '@mantine/core';

/* * */

export default createTheme({
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
				if (props.variant === 'pill') {
					defaultClasses = combineClasses(defaultClasses, [ButtonOverride.variantPill]);
				}
				return defaultClasses;
			},
		}),

	},

	//
});