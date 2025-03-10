/* * */

export interface SurveryResultsCardSchema {
	_group: string
	_id: number
	color: {
		opacity: string
		primary: string
		text: string
	}
	content: {
		description: string
	}
	header: {
		value: string
	}
}

/* * */

export const allResultsCardData: SurveryResultsCardSchema[] = [
	//

	//
	// INFORMATION CARD
	{
		_group: 'info_ao_publico',
		_id: 1,
		color: {
			opacity: '70%',
			primary: '#ACCC27',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Facilidade em obter informações no site da Carris Metropolitana sobre: preços, horários e serviços',
		},
		header: {
			value: '7,7',
		},
	},

	{
		_group: 'info_ao_publico',
		_id: 2,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Facilidade em obter informações nas paragens sobre preços, horários e serviços',
		},
		header: {
			value: '6,7',
		},
	},
	{
		_group: 'info_ao_publico',
		_id: 3,
		color: {
			opacity: '50%',
			primary: '#CCCC1B',
			text: '#00000080',
		},
		content: {
			description: 'Facilidade em obter informações nos autocarros sobre preços, horários e serviços',
		},
		header: {
			value: '7,0',
		},
	},

	{
		_group: 'info_ao_publico',
		_id: 4,
		color: {
			opacity: '70%',
			primary: '#ACCC27',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Facilidade em saber qual é a próxima paragem quando está dentro do autocarro',
		},
		header: {
			value: '7,6',
		},
	},
	{
		_group: 'info_ao_publico',
		_id: 5,
		color: {
			opacity: '50%',
			primary: '#CCCC1B',
			text: '#00000080',
		},
		content: {
			description: 'Facilidade em aceder a informações atualizadas',
		},
		header: {
			value: '7,2',
		},
	},
	{
		_group: 'info_ao_publico',
		_id: 6,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Facilidade em obter informação de quando chegará o próximo autocarro à paragem onde está',
		},
		header: {
			value: '6,6',
		},
	},
	{
		_group: 'info_ao_publico',
		_id: 7,
		color: {
			opacity: '50%',
			primary: '#CCCC1B',
			text: '#00000080',
		},
		content: {
			description: 'Facilidade em obter informação sobre como fazer as ligações entre paragens da Carris Metropolitana e outros modos de transporte',
		},
		header: {
			value: '7,1',
		},
	},
	{
		_group: 'info_ao_publico',
		_id: 8,
		color: {
			opacity: '70%',
			primary: '#ACCC27',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Facilidade na aquisição do bilhete simples a bordo',
		},
		header: {
			value: '8,8',
		},
	},

	//
	// REDE CARD

	{
		_group: 'info_rede',
		_id: 1,
		color: {
			opacity: '70%',
			primary: '#ACCC27',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Facilidade em chegar às suas áreas de interesse através da Carris Metropolitana*',
		},
		header: {
			value: '8',
		},
	},
	{
		_group: 'info_rede',
		_id: 2,
		color: {
			opacity: '70%',
			primary: '#ACCC27',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Duração da viagem (tempo no autocarro)',
		},
		header: {
			value: '7,7',
		},
	},
	{
		_group: 'info_rede',
		_id: 3,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Total da duração da viagem (tempo de espera + tempo da viagem) em relação à distância percorrida',
		},
		header: {
			value: '6,9',
		},
	},
	{
		_group: 'info_rede',
		_id: 4,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Pontualidade dos autocarros no local de partida',
		},
		header: {
			value: '6,5',
		},
	},
	{
		_group: 'info_rede',
		_id: 5,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Pontualidade dos autocarros no local de chegada',
		},
		header: {
			value: '6,7',
		},
	},
	{
		_group: 'info_rede',
		_id: 6,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Frequência de Interrupções ou cancelamentos das viagens previstas',
		},
		header: {
			value: '6,6',
		},
	},
	{
		_group: 'info_rede',
		_id: 7,
		color: {
			opacity: '50%',
			primary: '#CCCC1B',
			text: '#00000080',
		},
		content: {
			description: 'Adequação dos horários diurnos semanais face às suas necessidades*',
		},
		header: {
			value: '7,2',
		},
	},
	{
		_group: 'info_rede',
		_id: 8,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Adequação dos horários noturnos face às suas necessidades*',
		},
		header: {
			value: '5,9',
		},
	},
	{
		_group: 'info_rede',
		_id: 9,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Adequação dos horários de fins de semana face às suas necessidades*',
		},
		header: {
			value: '5,2',
		},
	},

	//
	// STOPS  CARDS

	{
		_group: 'info_stops',
		_id: 1,
		color: {
			opacity: '50%',
			primary: '#CCCC1B',
			text: '#00000080',
		},
		content: {
			description: 'Conforto das paragens que utiliza*',
		},
		header: {
			value: '7',
		},
	},
	{
		_group: 'info_stops',
		_id: 2,
		color: {
			opacity: '50%',
			primary: '#CCCC1B',
			text: '#00000080',
		},
		content: {
			description: 'Sensação de segurança nas paragens*',
		},
		header: {
			value: '7',
		},
	},
	{
		_group: 'info_stops',
		_id: 3,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Tempo de espera nas paragens',
		},
		header: {
			value: '6',
		},
	},

	//
	// BUS CARDS

	{
		_group: 'info_bus',
		_id: 1,
		color: {
			opacity: '70%',
			primary: '#ACCC27',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Sensação de segurança dentro dos autocarros Carris Metropolitana*',
		},
		header: {
			value: '8,3',
		},
	},
	{
		_group: 'info_bus',
		_id: 2,
		color: {
			opacity: '70%',
			primary: '#ACCC27',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Conforto no interior dos autocarros (Bancos, Espaço disponível, AC, etc)',
		},
		header: {
			value: '8,2',
		},
	},
	{
		_group: 'info_bus',
		_id: 3,
		color: {
			opacity: '70%',
			primary: '#CCCC1B',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Número de lugares sentados',
		},
		header: {
			value: '7,5',
		},
	},
	{
		_group: 'info_bus',
		_id: 4,
		color: {
			opacity: '70%',
			primary: '#ACCC27',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Limpeza dos autocarros',
		},
		header: {
			value: '8,2',
		},
	},
	{
		_group: 'info_bus',
		_id: 5,
		color: {
			opacity: '70%',
			primary: '#ACCC27',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Estado de Conservação dos autocarros',
		},
		header: {
			value: '8,5',
		},
	},

	//
	// SUPPORT CARDS

	{
		_group: 'info_support',
		_id: 1,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Facilidade em apresentar reclamações',
		},
		header: {
			value: '6,2',
		},
	},
	{
		_group: 'info_support',
		_id: 2,
		color: {
			opacity: '50%',
			primary: '#ffcc00',
			text: '#00000080',
		},
		content: {
			description: 'Facilidade na resolução de problemas',
		},
		header: {
			value: '5,8',
		},
	},
	{
		_group: 'info_support',
		_id: 3,
		color: {
			opacity: '70%',
			primary: '#ACCC27',
			text: '#FFFFFFE6',
		},
		content: {
			description: 'Apresentação e cortesia dos motoristas e outros colaboradores dos prestadores de serviço a operar sob a marca Carris Metropolitana',
		},
		header: {
			value: '7,7',
		},
	},
	{
		_group: 'info_support',
		_id: 4,
		color: {
			opacity: '50%',
			primary: '#CCCC1B',
			text: '#00000080',
		},
		content: {
			description: 'Apoio ao Cliente',
		},
		header: {
			value: '7,1',
		},
	},

	//
];
