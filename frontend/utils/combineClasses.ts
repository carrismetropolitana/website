/* * */

export default function combineClasses(defaultClasses, customClasses) {
	const customClasesString = customClasses.join(' ');
	return Object.entries(defaultClasses).reduce((acc, [key, value]) => {
		acc[key] = `${value} ${customClasesString}`;
		return acc;
	}, {});
};
