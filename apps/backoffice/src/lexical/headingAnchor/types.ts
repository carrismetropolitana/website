/* * */

export interface HeadingAnchorFeatureProps {
	inputWidth?: number
	label?: string
	placeholder?: string
}

export const defaultHeadingAnchorFeatureProps: Required<HeadingAnchorFeatureProps> = {
	inputWidth: 140,
	label: '#',
	placeholder: 'anchor-id',
};
