/* * */
// ICONS

export const IconsAlert = Object.freeze({
	ALERTS_ADDITIONAL_SERVICE: '/icons/alerts/ADDITIONAL_SERVICE.svg',
	ALERTS_DETOUR: '/icons/alerts/DETOUR.svg',
	ALERTS_MODIFIED_SERVICE: '/icons/alerts/MODIFIED_SERVICE.svg',
	ALERTS_OTHER_EFFECT: '/icons/alerts/OTHER_EFFECT.svg',
	ALERTS_REDUCED_SERVICE: '/icons/alerts/REDUCED_SERVICE.svg',
	ALERTS_STOP_MOVED: '/icons/alerts/STOP_MOVED.svg',
});

export const IconsFacility = Object.freeze({
	FACILITY_HEALTH_CLINIC: '/icons/facilities/health_clinic.svg',
	FACILITY_HOSPITAL: '/icons/facilities/hospital.svg',
	FACILITY_UNIVERSITY: '/icons/facilities/university.svg',
});

export const IconsMap = Object.freeze({
	MAP_CM_BUS_DELAY: '/icons/map/cm-bus-delay.png',
	MAP_CM_BUS_ERROR: '/icons/map/cm-bus-error.png',
	MAP_CM_BUS_REGULAR: '/icons/map/cm-bus-regular.png',
	MAP_CM_STORE_BUSY: '/icons/map/cm-store-busy.png',
	MAP_CM_STORE_CLOSED: '/icons/map/cm-store-closed.png',
	MAP_CM_STORE_OPEN: '/icons/map/cm-store-open.png',
	MAP_ENCM_OPEN: '/icons/map/map-encm-open.png',
	MAP_PIN: '/icons/map/map-pin.png',
	MAP_SHAPE_ARROW_DIRECTION: '/icons/map/shape-arrow-direction.png',
	MAP_STOP_SELECTED: '/icons/map/map-stop-selected.png',
});

export const IconsCommon = Object.freeze({
	AML_MAP: '/icons/common/aml-map.svg',
	AML_MAP_OPERATORS: '/icons/common/aml-map-with-operators.svg',
	AML_MAP_SINGLE: '/icons/common/aml-map-single.svg',
	COINS: '/icons/common/coins.svg',
	LIVRO_RECLAMACOES: '/icons/common/livro-de-reclamacoes.svg',
	QUESTION: '/icons/common/question.svg',
	RECEIPT: '/icons/common/receipt.svg',
	SAFARI_PINNED_TAB: '/icons/common/safari-pinned-tab.svg',
	TICKET: '/icons/common/ticket.svg',
});

export const IconsBrand = Object.freeze({
	BRAND_LOGO_DARK: '/icons/brand/carris-metropolitana-dark.svg',
	BRAND_LOGO_LIGHT: '/icons/brand/carris-metropolitana-light.svg',
});

export const IconsMobile = Object.freeze({
	MOBILE_ANDROID_192: '/icons/mobile/android-chrome-192x192.png',
	MOBILE_ANDROID_512: '/icons/mobile/android-chrome-512x512.png',
	MOBILE_APPLE: '/icons/mobile/apple-touch-icon.pmg',
});

export const Icons = Object.freeze({
	...IconsAlert,
	...IconsBrand,
	...IconsCommon,
	...IconsFacility,
	...IconsMap,
});

/* * */
// Images
export const ImagesMunicipality = Object.freeze({
	MUNICIPALITY_LISBOA: '/images/municipalities/lisboa.png',
	MUNICIPALITY_SETUBAL: '/images/municipalities/setubal.png',
});

export const ImagesCommon = Object.freeze({
	NAVEGANTE_CARD: '/images/common/navegante-card.png',
	NAVEGANTE_OCCASIONAL: '/images/common/navegante-occasional.png',
	PLACEHOLDER: '/images/common/placeholder.png',
});

export const ImagesPlanner = Object.freeze({
	PLANNER_CITY_MAPPER: '/images/planner/citymapper.png',
	PLANNER_GOOGLE_MAPS: '/images/planner/google-maps.png',
	PLANNER_MOOVIT: '/images/planner/moovit.png',
	PLANNER_TRANSIT: '/images/planner/transit.png',
});

export const ImagesHome = Object.freeze({
	CASO_DE_ESTUDO_LOURES: '/images/home/caso-de-estudo-loures.png',
	DRIVERS: '/images/home/drivers.png',
});

export const Images = Object.freeze({
	...ImagesCommon,
	...ImagesMunicipality,
	...ImagesPlanner,
	...ImagesHome,
});
