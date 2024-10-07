/* * */

/**
 * Use to show children only when light theme is active. Hidden otherwise.
 * @param {ReactNode} children The content to display in light theme.
 * @returns {JSX.Element} The rendered ThemeLight component.
 */

export function ThemeLight({ children }) {
	return (
		<theme-light>
			{children}
		</theme-light>
	);
}

/**
 * Use to show children only when dark theme is active. Hidden otherwise.
 * @param {ReactNode} children The content to display in dark theme.
 * @returns {JSX.Element} The rendered ThemeDark component.
 */

export function ThemeDark({ children }) {
	return (
		<theme-dark>
			{children}
		</theme-dark>
	);
}

/**
 * ThemeSwitch component to automatically toggle children components between dark and light themes.
 * @param {ReactNode} dark The content to display in dark theme.
 * @param {ReactNode} light The content to display in light theme.
 * @returns {JSX.Element} The rendered ThemeSwitch component.
 */

export function ThemeSwitch({ dark, light }) {
	return (
		<>
			<ThemeDark>
				{dark}
			</ThemeDark>
			<ThemeLight>
				{light}
			</ThemeLight>
		</>
	);
}
