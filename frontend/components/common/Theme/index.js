import React from 'react';

export function ThemeLight({ children }) {
	return (
		<theme-light>
			{children}
		</theme-light>
	);
}

export function ThemeDark({ children }) {
	return (
		<theme-dark>
			{children}
		</theme-dark>
	);
}

/**
 * ThemeSwitch component to toggle between dark and light themes.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.dark - The content to display in dark theme.
 * @param {React.ReactNode} props.light - The content to display in light theme.
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
