'use client';
import { Accordion } from '@mantine/core';
import { IconCaretLeftFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

export default function Section() {
	const groceries = [
		{
			description:
      `A Carris Metropolitana opera nos 18 municípios da AML: Alcochete, Almada, Amadora, Barreiro*, Cascais*, Lisboa*, Loures, Oeiras, Odivelas, Mafra, Moita, Montijo, Palmela, Seixal, Sesimbra, Setúbal, Sintra e Vila Franca de Xira. 
        *Barreiro, Cascais e Lisboa são servidos, em maior parte, pelos respetivos operadores municipais.`,
			value: 'O que é a Carris Metropolitana?',
		},
		{
			description: 'A Carris Metropolitana faz parte da Carris?',
			value: 'A Carris Metropolitana faz parte da Carris?',
		},
		{
			description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
			value: 'Broccoli',
		},
	];
	const items = groceries.map(item => (
		<Accordion.Item key={item.value} value={item.value}>
			<Accordion.Control>{item.value}</Accordion.Control>
			<Accordion.Panel>{item.description}</Accordion.Panel>
		</Accordion.Item>
	));
	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<p className={styles.label}>tópico</p>
				<h2>Section</h2>
			</div>
			<div>
				<Accordion chevron={<IconCaretLeftFilled />} classNames={styles} defaultValue="Apples">
					{items}
				</Accordion>
			</div>
		</div>
	);
}
