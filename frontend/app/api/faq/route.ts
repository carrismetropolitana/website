import type { FaqGroupByTopic } from '@/types/faq.types';

/* * */

export async function fetchFaqs() {
	const faqs: FaqGroupByTopic[] = [
		{
			_id: 'A',
			items: [
				{
					_id: 'A001',
					body: `A Carris Metropolitana opera nos 18 municípios da AML: Alcochete, Almada, Amadora, Barreiro*, Cascais*, Lisboa*, Loures, Oeiras, Odivelas, Mafra, Moita, Montijo, Palmela, Seixal, Sesimbra, Setúbal, Sintra e Vila Franca de Xira.  *Barreiro, Cascais e Lisboa são servidos, em maior parte, pelos respetivos operadores municipais.`,
					title: 'O que é a Carris Metropolitana?',
				},
				{
					_id: 'A002',
					body: 'No, the Carris Metropolitana is a separate entity from Carris.',
					title: 'Is the Carris Metropolitana part of Carris?',
				},
				{
					_id: 'A003',
					body: `A Carris Metropolitana e a Carris são entidades e marcas distintas, cada uma com as suas operações e áreas geográficas específicas.
                    A Carris Metropolitana é a marca estabelecida pela Transportes Metropolitanos de Lisboa (TML), que gere os serviços de transporte público rodoviário em várias regiões municipais e intermunicipais da área metropolitana.
                    Por sua vez, a Carris opera exclusivamente no município de Lisboa, tal como a MobiCascais em Cascais e os TCB (Transportes Coletivos do Barreiro) no Barreiro.`,
					title: 'A Carris Metropolitana faz parte da Carris?',
				},
			],
			title: 'Carris Metropolitana',
		},
		{
			_id: 'B',
			items: [
				{
					_id: 'B001',
					body: 'Com a entrada da Carris Metropolitana deixaram de prestar serviço na AML as empresas de transportes: Boa Viagem, Henrique Leonardo da Mota, Isidoro Duarte, JJ Santo António, Mafrense, Sulfertagus, TST, Vimeca, Scotturb.',
					title: 'Quais são as empresas que deixaram de prestar serviço na AML com a entrada em operação da Carris Metropolitana?',
				},
				{
					_id: 'B002',
					body: `A frota da Carris Metropolitana possui idade média inferior a 1 ano onde 5% dos veículos são não poluentes, energeticamente eficientes e 90% possuem classe de emissões EURO V ou superior.`,
					title: 'Os autocarros da Carris Metropolitana são novos?',
				},
				{
					_id: 'B003',
					body: `
                    <p>Os operadores prestadores de serviço da Carris Metropolitana são 4 e estão divididos por áreas da seguinte forma:&nbsp;</p>
                    <p>Área 1: Viação Alvorada&nbsp;<br>Área 2: Rodoviária de Lisboa&nbsp;<br>Área 3: TST&nbsp;<br>Área 4: Alsa Todi</p>
                    `,
					title: 'Quais são os operadores prestadores de serviço que atuam sob a marca Carris Metropolitana?',
				},
			],
			title: 'Operação',
		},
	];
	return faqs;
}

/* * */

export async function GET() {
	return Response.json(await fetchFaqs());
}
