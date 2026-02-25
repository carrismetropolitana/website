/* * */

export interface PipsSurveyOptionsSchema {
	_id: number
	content: {
		description?: string
		title?: string
	}
}

export const pipsSurveyOptionsData: PipsSurveyOptionsSchema[] = [
	{
		_id: 0,
		content: {
			description: 'O painel está a funcionar correctamente.',
			title: 'Tudo OK',
		},
	},
	{
		_id: 1,
		content: {
			description: 'O painel está ligado mas a data/hora estão incorretas.',
			title: 'Relógio Errado',
		},
	},
	{
		_id: 2,
		content: {
			description: 'O painel está desligado. É apresentado apenas o código QR.',
			title: 'Painel Desligado',
		},
	},
	{
		_id: 3,
		content: {
			description: 'O painel está vandalizado. Não é possível ler a informação.',
			title: 'Graffiti / Tags / Autocolantes no Painel',
		},
	},
	{
		_id: 4,
		content: {
			description: 'O painel está avariado (manchas, riscas). Não é possível ler a informação.',
			title: 'Danos Físicos no Painel ',
		},
	},
	{
		_id: 5,
		content: {
			description: 'A estrutura está vandalizada.',
			title: 'Graffiti / Tags na Estrutura',
		},
	},
	{
		_id: 6,
		content: {
			description: 'A estrutura está danificada (almogadelas, caixa torcida).',
			title: 'Danos Físicos na Estrutura',
		},
	},
];
