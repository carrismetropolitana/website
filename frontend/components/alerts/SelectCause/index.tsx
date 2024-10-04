'use client';

/* * */

import { AlertCauseIcon } from '@/components/alerts/AlertCauseEffectIcon';
import { useDebugContext } from '@/contexts/Debug.context';
import { AlertCause } from '@/types/alerts.types';
import { Flex, Group, Select, SelectProps, Text } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

type SelectAlertCauseProps = SelectProps;

export default function Component({ onChange, value, ...props }: SelectAlertCauseProps) {
	//
	// A. Setup variables
	const t = useTranslations('alerts.SelectCause');
	const debugContext = useDebugContext();

	//
	// B. Transform data

	//
	// C. Render components
	const renderSelectOption: SelectProps['renderOption'] = ({ option }) => {
		return (
			<Group gap={2}>
				<Flex direction="column">
					{/* Route Long Name */}
					<AlertCauseIcon cause={AlertCause[option.value]} className={styles.icon} withText />
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
				<AlertCauseIcon cause={AlertCause[value]} className={styles.icon} withText />
			</div>
		);
	};

	return (
		<Select
			allowDeselect={false}
			data={Object.values(AlertCause)}
			leftSection={<IconExclamationCircle size={20} />}
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
