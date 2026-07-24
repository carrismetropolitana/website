import { QUIZ_BASE_PATH } from './siteConfig';

export interface Question {
	id: number
	illustration?: string
	options: {
		description: string
		label: string
		value: string
	}[]
	text: string
}

export interface PersonalityResult {
	description: string
	id: string
	illustration: string
	letter: string
	routeDescription: string
	routeName: string
	routeNumber: string
	title: string
}

export const questions: Question[] = [
	{
		id: 1,
		illustration: 'question-a',
		options: [
			{
				description: 'Aproveitar o mar, o sol e as ondas.',
				label: 'Relaxar na areia o dia todo',
				value: 'a',
			},
			{
				description: 'Caminhar pela natureza e descobrir vistas.',
				label: 'Explorar trilhos escondidos',
				value: 'b',
			},
			{
				description: 'A paragem numa esplanada é obrigatória.',
				label: 'Comer boa comida local',
				value: 'c',
			},
			{
				description: 'Fotografar as viagens mais bonitas.',
				label: 'Registar os momentos',
				value: 'd',
			},
		],
		text: 'Qual é a tua atividade preferida para fazer na Serra da Arrábida?',
	},
	{
		id: 2,
		illustration: 'question-b',
		options: [
			{
				description: 'Confiro os horários com antecedência no site ou app da Carris Metropolitana.',
				label: 'O Planeador',
				value: 'a',
			},
			{
				description: 'Deixo-me levar pelos caminhos da Serra.',
				label: 'O Explorador Livre',
				value: 'b',
			},
			{
				description: 'Procuro sempre as 10 melhores coisas para fazer.',
				label: 'O Turista da Serra',
				value: 'c',
			},
			{
				description: 'Procuro dicas com pessoas locais.',
				label: 'Caçador de Experiências Locais',
				value: 'd',
			},
		],
		text: 'Que tipo de passageiro és tu?',
	},
	{
		id: 3,
		illustration: 'question-c',
		options: [
			{
				description: 'Adoro ver o mundo a passar.',
				label: 'A paisagem pela janela',
				value: 'a',
			},
			{
				description: 'Posso relaxar e não pensar em nada.',
				label: 'Tempo para descansar',
				value: 'b',
			},
			{
				description: 'Nunca se sabe quem vais encontrar.',
				label: 'Conhecer pessoas novas',
				value: 'c',
			},
			{
				description: 'Sem stress, só aproveitar.',
				label: 'A liberdade de não conduzir',
				value: 'd',
			},
		],
		text: 'Qual é a melhor parte de uma viagem de autocarro?',
	},
	{
		id: 4,
		illustration: 'question-d',
		options: [
			{
				description: 'Água cristalina e areia branca.',
				label: 'Praia de Galapinhos',
				value: 'a',
			},
			{
				description: 'A caminhada vale a pena.',
				label: 'Convento da Arrábida',
				value: 'b',
			},
			{
				description: 'Desde que tenha vista para o mar.',
				label: 'Qualquer esplanada',
				value: 'c',
			},
			{
				description: 'O local perfeito para ver o pôr do sol.',
				label: 'Miradouro do Portinho da Arrábida',
				value: 'd',
			},
		],
		text: 'Qual é o teu local favorito da Arrábida?',
	},
	{
		id: 5,
		illustration: 'question-e',
		options: [
			{
				description: 'Sem pressas, aproveito cada momento.',
				label: 'Tranquilo e relaxado',
				value: 'a',
			},
			{
				description: 'Quero explorar e ver o máximo possível.',
				label: 'Aventureiro e ativo',
				value: 'b',
			},
			{
				description: 'Gosto de parar, conversar e saborear.',
				label: 'Social e descontraído',
				value: 'c',
			},
			{
				description: 'Procuro sempre ângulos únicos e histórias novas.',
				label: 'Criativo e observador',
				value: 'd',
			},
		],
		text: 'Como descreves o teu ritmo de viagem ideal?',
	},
];

export const personalityResults: Record<string, PersonalityResult> = {
	'result-a': {
		description: 'Ninguém aproveita tanto o sol e as ondas como tu.',
		id: 'result-a',
		illustration: 'result-a.png',
		letter: 'A',
		routeDescription: 'Esta linha leva-te a um dia entre mergulhos, areia dourada e dias sem pressa!',
		routeName: 'Creiro - Galapos',
		routeNumber: '4477',
		title: 'Mestre do Bronze',
	},
	'result-b': {
		description: 'Uau, conheces todos os trilhos e os locais mais secretos da Arrábida.',
		id: 'result-b',
		illustration: 'result-b.png',
		letter: 'B',
		routeDescription: 'Esta linha leva-te a um passeio entre a serra e algumas das paisagens mais incríveis da Arrábida!',
		routeName: ' Setúbal (ITS) - Praia do Creiro via Vila Nogueira de Azeitão',
		routeNumber: '4470',
		title: 'Guardião da Serra',
	},
	'result-c': {
		description: 'Doutorado em Choco Frito e nas melhores tascas da região.',
		id: 'result-c',
		illustration: 'result-c.png',
		letter: 'C',
		routeDescription: 'Entre petiscos, mercados e restaurantes típicos, esta linha é perfeita para descobrir os sabores da região!',
		routeName: 'Praia da Figueirinha - Setúbal (Centro Comercial)',
		routeNumber: '4474',
		title: 'Caçador de Sabores',
	},
	'result-d': {
		description: 'Com ou sem golden hour, tens o melhor olhar para fotografia.',
		id: 'result-d',
		illustration: 'result-d.png',
		letter: 'D',
		routeDescription: 'Com esta linha, há sempre uma nova vista para descobrir e fotografar!',
		routeName: 'Setúbal (ITS) - Praia do Creiro via Vila Nogueira de Azeitão',
		routeNumber: '4470',
		title: 'Explorador de Paisagens',
	},
};

export function calculateResult(answers: string[]): PersonalityResult {
	const resultMap: Record<string, string> = {
		a: 'result-a',
		b: 'result-b',
		c: 'result-c',
		d: 'result-d',
	};

	const tieBreakerMap: Record<string, string[]> = {
		a: ['a', 'b', 'c', 'd'],
		b: ['b', 'a', 'd', 'c'],
		c: ['c', 'd', 'a', 'b'],
		d: ['d', 'c', 'b', 'a'],
	};

	const mainAnswers = answers.slice(0, 4);
	const tieBreakerAnswer = answers[4];

	const counts: Record<string, number> = {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
	};

	mainAnswers.forEach((answer) => {
		if (answer in counts) {
			counts[answer]++;
		}
	});

	const maxCount = Math.max(...Object.values(counts));
	const tiedAnswers = Object.keys(counts).filter(
		key => counts[key] === maxCount,
	);

	let finalAnswer = tiedAnswers[0];

	if (tiedAnswers.length > 1 && tieBreakerAnswer) {
		if (tiedAnswers.includes(tieBreakerAnswer)) {
			finalAnswer = tieBreakerAnswer;
		}
		else {
			const preferenceOrder = tieBreakerMap[tieBreakerAnswer] || ['a', 'b', 'c', 'd'];
			finalAnswer
        = preferenceOrder.find(answer => tiedAnswers.includes(answer))
          || tiedAnswers[0];
		}
	}

	return personalityResults[resultMap[finalAnswer]];
}

export const letterToResultId: Record<string, string> = {
	A: 'result-a',
	B: 'result-b',
	C: 'result-c',
	D: 'result-d',
};

export function getResultByLetter(letter: string): null | PersonalityResult {
	const normalizedLetter = letter.toUpperCase();
	const resultId = letterToResultId[normalizedLetter];

	if (!resultId) {
		return null;
	}

	return personalityResults[resultId] || null;
}

export function getResultSharePath(letter: string): string {
	return `${QUIZ_BASE_PATH}/resultado/${letter.toLowerCase()}`;
}
