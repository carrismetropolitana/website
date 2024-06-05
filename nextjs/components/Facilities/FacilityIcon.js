import FacilityBoat from './FacilityBoat';
import FacilityLightRail from './FacilityLightRail';
import FacilitySchool from './FacilitySchool';
import FacilityShopping from './FacilityShopping';
import FacilitySubway from './FacilitySubway';
import FacilityTrain from './FacilityTrain';
import FacilityTransitOffice from './FacilityTransitOffice';

export default function FacilityIcon({ name, size = 24 }) {
	//

	switch (name) {
		case 'school':
			return <FacilitySchool size={size} />;

		case 'boat':
			return <FacilityBoat size={size} />;

		case 'transit_office':
			return <FacilityTransitOffice size={size} />;

		case 'light_rail':
			return <FacilityLightRail size={size} />;

		case 'train':
			return <FacilityTrain size={size} />;

		case 'subway':
			return <FacilitySubway size={size} />;

		case 'shopping':
			return <FacilityShopping size={size} />;

		default:
			return name;
	}
	//
}
