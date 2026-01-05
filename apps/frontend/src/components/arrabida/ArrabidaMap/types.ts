/* * */

export interface BeachPinProps {
	isActive?: boolean
}

export interface ArrabidaMapProps {
	onPinClick?: (accordionId: string) => void
	selectedAccordionId?: string
	selectedLineId?: null | string
}

export interface BeachPin {
	accordionId: string
	coordinates: [number, number] // [longitude, latitude]
	id: string
	lineIds: string[]
	name: string
}

export interface Stop {
	accordionId: string
	id: number
	name: string
	position: { x: number, y: number }
}
