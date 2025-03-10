/* * */

export interface SurveryAboutCardSchema {
	_id: string
	colors: {
		border?: string
		primary: string
	}
	content: {
		header_title: string
		intro?: string
		legend: string
		lottie_src?: string
	}
	header: {
		value: string
	}
	stat_level: number
}

/* * */

export const allAboutCardsData: SurveryAboutCardSchema[] = [
	//

	//
	{
		_id: 'Total_Interviews',
		colors: {
			border: '#FFFFFF',
			primary: '#FFDD00',
		},
		content: {
			header_title: 'Com quem falámos?',
			legend: 'total de entrevistas presenciais concretizadas',
			lottie_src: '/assets/survey/animations/sobre/Total_Interviews.json',
		},
		header: {
			value: '3200',
		},
		stat_level: 1,
	},
	{
		_id: 'Total_Lines',
		colors: {
			border: '#BEBEC8',
			primary: '#FAFAFA',
		},
		content: {
			header_title: 'Onde ?',
			intro: 'a bordo de',
			legend: 'linhas de diferentes níveis de procura',
			lottie_src: '/assets/survey/animations/sobre/Total_Lines.json',

		},
		header: {
			value: '199',
		},
		stat_level: 1,
	},
	{
		_id: 'Total_When',
		colors: {
			border: '#BEBEC8',
			primary: '#FAFAFA',
		},
		content: {
			header_title: 'Quando?',
			intro: 'entre os meses de',
			legend: 'de 2024',
			lottie_src: '/assets/survey/animations/sobre/Total_Months.json',

		},
		header: {
			value: 'março e junho',
		},
		stat_level: 1,
	},

	{
		_id: 'Total_Duration',
		colors: {
			border: '#BEBEC8',
			primary: '#FAFAFA',
		},
		content: {
			header_title: 'Durante Quanto Tempo?',
			legend: 'duração média de cada entrevista',
			lottie_src: '/assets/survey/animations/sobre/Total_Duration.json',

		},
		header: {
			value: '13 min',
		},
		stat_level: 1,
	},
	{
		_id: 'Total_Pilots',
		colors: {
			border: '#BEBEC8',
			primary: '#FAFAFA',
		},
		content: {
			header_title: 'Como Testámos?',
			intro: '',
			legend: 'que incluiram focus group e inquéritos piloto',
			lottie_src: '/assets/survey/animations/sobre/Total_Pilots.json',

		},
		header: {
			value: '2 fases piloto',
		},
		stat_level: 1,
	},
];
