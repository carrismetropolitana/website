/* * */

/**
 * Use to show children only when desktop theme is active. Hidden otherwise.
 * @param {ReactNode} children The content to display in desktop theme.
 * @returns {JSX.Element} The rendered FormatDesktop component.
 */

export function FormatDesktop({ children }) {
	return (
		<format-desktop>
			{children}
		</format-desktop>
	);
}

/**
 * Use to show children only when mobile theme is active. Hidden otherwise.
 * @param {ReactNode} children The content to display in mobile theme.
 * @returns {JSX.Element} The rendered FormatMobile component.
 */

export function FormatMobile({ children }) {
	return (
		<format-mobile>
			{children}
		</format-mobile>
	);
}

/**
 * FormatSwitch component to automatically toggle children components between mobile and desktop themes.
 * @param {ReactNode} mobile The content to display in mobile theme.
 * @param {ReactNode} desktop The content to display in desktop theme.
 * @returns {JSX.Element} The rendered FormatSwitch component.
 */

export function FormatSwitch({ desktop, mobile }) {
	return (
		<>
			<FormatDesktop>
				{desktop}
			</FormatDesktop>
			<FormatMobile>
				{mobile}
			</FormatMobile>
		</>
	);
}
