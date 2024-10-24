/* * */

import Input from '@/components/common/Input';
import { Select } from '@mantine/core';
import { IconAB } from '@tabler/icons-react';
// import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function ServicePointsFilters() {
	//

	//
	// A. Setup variables

	// const t = useTranslations('cards.MunicipalDiscounts');

	//
	// B. Render components

	return (
		<div className={styles.filters}>
			<div className={styles.filtersA}>
				<Input className={styles.input} leftSection={<IconAB />} placeholder="Pesquisar..." />
				<div className={styles.cardTypeWrapper}>
					<div><Select leftSection={<IconAB />} placeholder="Quero comprar cartão..." /></div>
					<div><Select leftSection={<IconAB />} placeholder="Quero ativar o desconto..." /></div>
				</div>
			</div>
			<div className={styles.filtersB}>
				<div><Select leftSection={<IconAB />} placeholder="Filtrar por munícipio/localidade" /></div>
				<div><Select leftSection={<IconAB />} placeholder="Quero Carregar" /></div>
			</div>
		</div>
	);

	//
}
