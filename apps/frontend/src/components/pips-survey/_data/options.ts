/* * */

export interface PipsSurveyOptionsSchema {
	_id: number
	content: {
		code?: string
		description?: string
		title?: string
	}
}

export const pipsSurveyOptionsData: PipsSurveyOptionsSchema[] = [
	{
		_id: 0,
		content: {
			code: 'ok',
			description: 'O painel está a funcionar correctamente.',
			title: 'Tudo OK',
		},
	},
	{
		_id: 1,
		content: {
			code: 'wrong_clock',
			description: 'O painel está ligado mas a data/hora estão incorretas.',
			title: 'Relógio Errado',
		},
	},
	{
		_id: 2,
		content: {
			code: 'screen_off',
			description: 'O painel está desligado. É apresentado apenas o código QR.',
			title: 'Painel Desligado',
		},
	},
	{
		_id: 3,
		content: {
			code: 'screen_graffiti',
			description: 'O painel está vandalizado. Não é possível ler a informação.',
			title: 'Graffiti / Tags / Autocolantes no Painel',
		},
	},
	{
		_id: 4,
		content: {
			code: 'screen_damage',
			description: 'O painel está avariado (manchas, riscas). Não é possível ler a informação.',
			title: 'Danos Físicos no Painel ',
		},
	},
	{
		_id: 5,
		content: {
			code: 'structure_graffiti',
			description: 'A estrutura está vandalizada.',
			title: 'Graffiti / Tags na Estrutura',
		},
	},
	{
		_id: 6,
		content: {
			code: 'structure_damage',
			description: 'A estrutura está danificada (almogadelas, caixa torcida).',
			title: 'Danos Físicos na Estrutura',
		},
	},
];
