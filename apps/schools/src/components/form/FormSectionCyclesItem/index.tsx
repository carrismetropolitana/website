'use client';

/* * */

import { useUpdateSchoolFormContext } from '@/form/form';
import { Checkbox, Collapse, Paper, Stack } from '@mantine/core';
import { TimePicker } from '@mantine/dates';

import styles from './styles.module.css';

/* * */

interface Props {
	fieldKey: string
	label: string
}

/* * */

export function FormSectionCyclesItem({ fieldKey, label }: Props) {
	//

	//
	// A. Setup Variables

	const form = useUpdateSchoolFormContext();

	const isEnabled = form.getValues().school_cycles?.[fieldKey]?._is_enabled;

	//
	// B. Render Component

	return (
		<Paper bg={isEnabled ? 'var(--mantine-color-blue-light)' : ''} p="md" shadow="none">
			<Stack p={8}>

				<Checkbox
					c={isEnabled ? 'blue' : ''}
					fw={700}
					label={label}
					{...form.getInputProps(`school_cycles.${fieldKey}._is_enabled`, { type: 'checkbox' })}
				/>

				<Collapse expanded={isEnabled}>
					<div className={styles.timeGrid}>
						<TimePicker
							label="Principal Hora de entrada de manhã"
							{...form.getInputProps(`school_cycles.${fieldKey}.morning_entry`)}
						/>
						<TimePicker
							label="Principal Hora de saída da manhã"
							{...form.getInputProps(`school_cycles.${fieldKey}.morning_exit`)}
						/>
						<TimePicker
							label="Principal Hora de entrada da tarde"
							{...form.getInputProps(`school_cycles.${fieldKey}.afternoon_entry`)}
						/>
						<TimePicker
							label="Principal Hora de saída da tarde"
							{...form.getInputProps(`school_cycles.${fieldKey}.afternoon_exit`)}
						/>
					</div>
				</Collapse>

			</Stack>
		</Paper>
	);

	//
}
