import { QUIZ_BASE_PATH } from './siteConfig';

export interface Question {
  id: number;
  text: string;
  illustration?: string;
  options: {
    value: string;
    label: string;
    description: string;
  }[];
}

export interface PersonalityResult {
  id: string;
  letter: string;
  title: string;
  description: string;
  routeNumber: string;
  routeName: string;
  routeDescription: string;
  illustration: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Qual é a tua atividade preferida para fazer na Serra da Arrábida?",
    illustration: "question-a",
    options: [
      {
        value: "a",
        label: "Relaxar na areia o dia todo",
        description: "Aproveitar o mar, o sol e as ondas."
      },
      {
        value: "b",
        label: "Explorar trilhos escondidos",
        description: "Caminhar pela natureza e descobrir vistas."
      },
      {
        value: "c",
        label: "Comer boa comida local",
        description: "A paragem numa esplanada é obrigatória."
      },
      {
        value: "d",
        label: "Registar os momentos",
        description: "Fotografar as viagens mais bonitas."
      }
    ]
  },
  {
    id: 2,
    text: "Que tipo de passageiro és tu?",
    illustration: "question-b",
    options: [
      {
        value: "a",
        label: "O Planeador",
        description: "Confiro os horários com antecedência no site ou app da Carris Metropolitana."
      },
      {
        value: "b",
        label: "O Explorador Livre",
        description: "Deixo-me levar pelos caminhos da Serra."
      },
      {
        value: "c",
        label: "O Turista da Serra",
        description: "Procuro sempre as 10 melhores coisas para fazer."
      },
      {
        value: "d",
        label: "Caçador de Experiências Locais",
        description: "Procuro dicas com pessoas locais."
      }
    ]
  },
  {
    id: 3,
    text: "Qual é a melhor parte de uma viagem de autocarro?",
    illustration: "question-c",
    options: [
      {
        value: "a",
        label: "A paisagem pela janela",
        description: "Adoro ver o mundo a passar."
      },
      {
        value: "b",
        label: "Tempo para descansar",
        description: "Posso relaxar e não pensar em nada."
      },
      {
        value: "c",
        label: "Conhecer pessoas novas",
        description: "Nunca se sabe quem vais encontrar."
      },
      {
        value: "d",
        label: "A liberdade de não conduzir",
        description: "Sem stress, só aproveitar."
      }
    ]
  },
  {
    id: 4,
    text: "Qual é o teu local favorito da Arrábida?",
    illustration: "question-d",
    options: [
      {
        value: "a",
        label: "Praia de Galapinhos",
        description: "Água cristalina e areia branca."
      },
      {
        value: "b",
        label: "Convento da Arrábida",
        description: "A caminhada vale a pena."
      },
      {
        value: "c",
        label: "Qualquer esplanada",
        description: "Desde que tenha vista para o mar."
      },
      {
        value: "d",
        label: "Miradouro do Portinho da Arrábida",
        description: "O local perfeito para ver o pôr do sol."
      }
    ]
  },
  {
    id: 5,
    text: "Como descreves o teu ritmo de viagem ideal?",
    illustration: "question-e",
    options: [
      {
        value: "a",
        label: "Tranquilo e relaxado",
        description: "Sem pressas, aproveito cada momento."
      },
      {
        value: "b",
        label: "Aventureiro e ativo",
        description: "Quero explorar e ver o máximo possível."
      },
      {
        value: "c",
        label: "Social e descontraído",
        description: "Gosto de parar, conversar e saborear."
      },
      {
        value: "d",
        label: "Criativo e observador",
        description: "Procuro sempre ângulos únicos e histórias novas."
      }
    ]
  }
];

export const personalityResults: Record<string, PersonalityResult> = {
  "result-a": {
    id: "result-a",
    letter: "A",
    title: "Mestre do Bronze",
    description: "Ninguém aproveita tanto o sol e as ondas como tu.",
    routeNumber: "4477",
    routeName: "Creiro - Galapos",
    routeDescription: "Esta linha leva-te a um dia entre mergulhos, areia dourada e dias sem pressa!",
    illustration: "result-a.svg"
  },
  "result-b": {
    id: "result-b",
    letter: "B",
    title: "Guardião da Serra",
    description: "Uau, conheces todos os trilhos e os locais mais secretos da Arrábida.",
    routeNumber: "4470",
    routeName: " Setúbal (ITS) - Praia do Creiro via Vila Nogueira de Azeitão",
    routeDescription: "Esta linha leva-te a um passeio entre a serra e algumas das paisagens mais incríveis da Arrábida!",
    illustration: "result-b.svg"
  },
  "result-c": {
    id: "result-c",
    letter: "C",
    title: "Caçador de Sabores",
    description: "Doutorado em Choco Frito e nas melhores tascas da região.",
    routeNumber: "4474",
    routeName: "Praia da Figueirinha - Setúbal (Centro Comercial)",
    routeDescription: "Entre petiscos, mercados e restaurantes típicos, esta linha é perfeita para descobrir os sabores da região!",
    illustration: "result-c.svg"
  },
  "result-d": {
    id: "result-d",
    letter: "D",
    title: "Explorador de Paisagens",
    description: "Com ou sem golden hour, tens o melhor olhar para fotografia.",
    routeNumber: "4470",
    routeName: "Setúbal (ITS) - Praia do Creiro via Vila Nogueira de Azeitão",
    routeDescription: "Com esta linha, há sempre uma nova vista para descobrir e fotografar!",
    illustration: "result-d.svg"
  }
};

export function calculateResult(answers: string[]): PersonalityResult {
  const resultMap: Record<string, string> = {
    a: 'result-a',
    b: 'result-b',
    c: 'result-c',
    d: 'result-d'
  };

  const tieBreakerMap: Record<string, string[]> = {
    a: ['a', 'b', 'c', 'd'],
    b: ['b', 'a', 'd', 'c'],
    c: ['c', 'd', 'a', 'b'],
    d: ['d', 'c', 'b', 'a']
  };

  const mainAnswers = answers.slice(0, 4);
  const tieBreakerAnswer = answers[4];

  const counts: Record<string, number> = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
  };

  mainAnswers.forEach((answer) => {
    if (answer in counts) {
      counts[answer]++;
    }
  });

  const maxCount = Math.max(...Object.values(counts));
  const tiedAnswers = Object.keys(counts).filter(
    (key) => counts[key] === maxCount
  );

  let finalAnswer = tiedAnswers[0];

  if (tiedAnswers.length > 1 && tieBreakerAnswer) {
    if (tiedAnswers.includes(tieBreakerAnswer)) {
      finalAnswer = tieBreakerAnswer;
    } else {
      const preferenceOrder = tieBreakerMap[tieBreakerAnswer] || ['a', 'b', 'c', 'd'];
      finalAnswer =
        preferenceOrder.find((answer) => tiedAnswers.includes(answer)) ||
        tiedAnswers[0];
    }
  }

  return personalityResults[resultMap[finalAnswer]];
}

export const letterToResultId: Record<string, string> = {
  'A': 'result-a',
  'B': 'result-b',
  'C': 'result-c',
  'D': 'result-d'
};

export function getResultByLetter(letter: string): PersonalityResult | null {
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