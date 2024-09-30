/* * */

import Section from '@/components/layout/Section';
import { Discount } from '@/types/discount.types';

import DiscountTableDesktop from '../DiscountTableDesktop';
import DiscountTableMobile from '../DiscountTableMobile';
import styles from './styles.module.css';
/* * */

export const discounts: Discount[] = [
	{
		description: 'O desconto que todos têm por direito. Com o passe navegante® as famílias portuguesas passaram a poupar ??€ em média por pessoa.',
		metropolitan: '40 € / mês',
		municipal: '30 € / mês',
		name: 'Normal',
	},
	{
		description: 'Desconto de 100% para todos os jovens estudantes menores de 18 anos. Não é necessário apresentar nenhuma declaração, mas pode ser preciso confirmar a data de nascimento. Saiba mais no site navegante.pt',
		metropolitan: 'GRÁTIS',
		municipal: 'N/A',
		name: 'Sub18',
	},
	{
		description: 'Desconto de 100% para todos os jovens estudantes entre os 19 e os 23 anos. Não é necessário apresentar declaração de inscrição em instituição de ensino. Saiba mais no site navegante.pt',
		metropolitan: 'GRÁTIS',
		municipal: 'N/A',
		name: 'Sub23',
	},
	{
		description: 'Desconto de 50% mediante apresentação de declaração de rendimentos. Saiba mais no site navegante.pt',
		metropolitan: '20 € / mês',
		municipal: '15 € / mês',
		name: 'Social+ A',
	},
	{
		description: 'Desconto de 25% mediante apresentação de declaração de rendimentos. Saiba mais no site navegante.pt',
		metropolitan: '30 € / mês',
		municipal: '22,5 € / mês',
		name: 'Social+ B',
	},
	{
		description: 'Desconto de 50% para utilizadores com 65 ou mais anos. Não é necessário apresentar declaração mas pode ser necessário confirmar a sua data de nascimento. Válido apenas para a modalidade metropolitana. Saiba mais no site navegante.pt',
		metropolitan: '20 € / mês',
		municipal: 'N/A',
		name: '+65',
	},
	{
		description: 'Desconto de 100% para antigos combatentes com 65 ou mais anos. É necessário apresentar declaração. Saiba mais no site navegante.pt',
		metropolitan: 'GRÁTIS',
		municipal: 'N/A',
		name: 'Antigo Combatente >65',
	},
	{
		description: 'Desconto de 30€ para antigos combatentes com menos de 65 anos. É necessário apresentar declaração. Saiba mais no site navegante.pt',
		metropolitan: '10 € / mês',
		municipal: 'GRÁTIS',
		name: 'Antigo Combatente <65',
	},
	{
		description: 'Desconto válido para agregados familiares com pelo menos 3 indivíduos. É necessário que todos os elementos do agregado tenham o mesmo domicílio fiscal, residam num dos 18 municípios da aml, e que tenham relação familiar direta de ascendência ou descendência com o titular. Saiba mais no site navegante.pt',
		metropolitan: '80 € / mês',
		municipal: '60 € / mês',
		name: 'Família',
	},

];

export default function Component() {
	return (
		<Section heading="Descontos" subheading="Descubra quanto custa viajar na CMetropolitana de vez em quando. Para utilizações mais frequentes sugerimos a adesão ao sistema navegante®." withChildrenPadding>
			<div className={styles.desktop}>
				<DiscountTableDesktop discounts={discounts} />
			</div>
			<div className={styles.mobile}>
				<DiscountTableMobile discounts={discounts} />
			</div>
		</Section>
	);
}
