/* * */

export interface SurveyPassengersCardSchema {
	_id: string
	content: {
		lottie_src: string
	}
	header: {
		title: string
	}
}

/* * */

export const allPassangersCardsData: SurveyPassengersCardSchema[] = [
	//

	//
	{
		_id: 'Passenger_Gender',
		content: {
			lottie_src: '/assets/survey/animations/passageiros/Passenger_Gender.json',
		},
		header: {
			title: 'Género',
		},
	},

	{
		_id: 'Age',
		content: {
			lottie_src: '/assets/survey/animations/passageiros/Passenger_Age.json',
		},
		header: {
			title: 'Idade',
		},
	},

	{
		_id: 'Occupation',
		content: {
			lottie_src: '/assets/survey/animations/passageiros/Passenger_Occupation.json',
		},
		header: {
			title: 'Ocupação',
		},
	},

	{
		_id: 'Commute',
		content: {
			lottie_src: '/assets/survey/animations/passageiros/Passenger_Commute.json',
		},
		header: {
			title: 'Regime de Deslocação',
		},
	},
	{
		_id: 'Passenger_Education',
		content: {
			lottie_src: '/assets/survey/animations/passageiros/Passenger_Education.json',
		},
		header: {
			title: 'Nível de Instrução',
		},
	},
	// {
	// 	_id: 'last_card',
	// 	content: {
	// 		lottie_src: '/assets/survey/animations/passageiros/Passenger_Last.json',
	// 	},
	// 	header: {
	// 		title: '',
	// 	},
	// },
];
