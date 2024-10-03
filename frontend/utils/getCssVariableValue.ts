/* * */

export const getCssVariableValue = (variableName: string) => {
	if (typeof window === 'undefined') return undefined;
	return window.getComputedStyle(document.documentElement)
		.getPropertyValue(variableName)
		.trim();
};
