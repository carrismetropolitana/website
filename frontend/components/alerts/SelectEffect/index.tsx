'use client';

/* * */

import { AlertEffectIcon } from '@/components/alerts/AlertCauseEffectIcon';
// import { useDebugContext } from '@/contexts/Debug.context';
import { AlertEffect } from '@/types/alerts.types';
import { Flex, Group, Select, SelectProps, Text } from '@mantine/core';
import { IconBolt } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

type SelectAlertEffectProps = SelectProps;

export default function Component({ onChange, value, ...props }: SelectAlertEffectProps) {
	//
	// A. Setup variables
	const t = useTranslations('alerts.SelectEffect');
	// const debugContext = useDebugContext();

	//
	// B. Transform data

	//
	// C. Render components
	const renderSelectOption: SelectProps['renderOption'] = ({ option }) => {
		return (
			<Group gap={2}>
				<Flex direction="column">
					{/* Route Long Name */}
					<AlertEffectIcon className={styles.icon} effect={AlertEffect[option.value]} withText />
				</Flex>
			</Group>
		);
	};

	const renderSelectRoot = (props) => {
		if (!value) return (
			<div {...props}>
				<Text className={styles.placeholder}>{t('placeholder')}</Text>
			</div>
		);

		return (
			<div {...props}>
				{/* Route Long Name */}
				<AlertEffectIcon className={styles.icon} effect={AlertEffect[value]} withText />
			</div>
		);
	};

	return (
		<Select
			allowDeselect={false}
			data={Object.values(AlertEffect)}
			leftSection={<IconBolt size={20} />}
			onChange={onChange}
			renderOption={renderSelectOption}
			renderRoot={renderSelectRoot || undefined}
			value={value}
			w="100%"
			clearable
			{...props}
		/>
	);
}
