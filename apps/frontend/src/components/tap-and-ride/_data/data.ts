/* * */

interface TapAndRideItemProps {
	content: string
	id: string
	subcontent?: string
	subcontent2?: string
	subcontentImage?: string
	title: string
}

/* * */

export const tapAndRideData: TapAndRideItemProps[] = [
	// Section 1

	{
		content: 'Section1.what_is.content',
		id: 'Section1.what_is',
		title: 'Section1.what_is.title',
	},
	{
		content: 'Section1.where_available.content',
		id: 'Section1.where_available',
		subcontent: 'Section1.where_available.subcontent',
		subcontent2: 'Section1.where_available.subcontent2',
		subcontentImage: '/assets/tap-and-ride/validator_tap-and-ride.png',
		title: 'Section1.where_available.title',
	},
];
