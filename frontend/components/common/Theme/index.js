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
