import { Combobox, InputBase, useCombobox } from '@mantine/core';
import { useState } from 'react';

// Define interfaces for the data structure
interface ComboboxGroupData {
	group: string
	items: string[]
}

export interface ComboboxProps {
	data: ComboboxGroupData[] | string[]
	label?: string // Optional label for the combobox
	onChange?: (value: null | string) => void // Callback for selection
	placeholder?: string // Placeholder text for the input
	searchable?: boolean // Enables search functionality
}

const isGroupedData = (data: ComboboxGroupData[] | string[]): data is ComboboxGroupData[] => {
	return Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && 'group' in data[0];
};

// The Custom Combobox component that handles both grouped and non-grouped data
export default function CustomCombobox({
	data,
	label,
	onChange,
	placeholder = 'Select an option',
	searchable = true,
}: ComboboxProps) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const [value, setValue] = useState<null | string>(null);
	const [search, setSearch] = useState('');

	// Flatten the options for filtering
	const allItems = isGroupedData(data)
		? data.reduce<string[]>((acc, group) => [...acc, ...group.items], [])
		: data;

	// Determine if filtering should be applied based on the search
	const shouldFilterOptions = searchable && allItems.every(item => item !== search);

	// Filter items based on the search query
	const filteredGroups = isGroupedData(data)
		? data.map(group => ({
			...group,
			items: shouldFilterOptions
				? group.items.filter(item =>
					item.toLowerCase().includes(search.toLowerCase().trim()))
				: group.items,
		}))
		: shouldFilterOptions
			? data.filter(item => item.toLowerCase().includes(search.toLowerCase().trim()))
			: data;

	// Render grouped or flat options
	const renderOptions = () => {
		if (isGroupedData(data)) {
			return (filteredGroups as ComboboxGroupData[]).map(group => (
				<Combobox.Group key={group.group} label={group.group}>
					{group.items.map(item => (
						<Combobox.Option key={item} value={item}>
							{item}
						</Combobox.Option>
					))}
				</Combobox.Group>
			));
		}
		else {
			return (filteredGroups as string[]).map(item => (
				<Combobox.Option key={item} value={item}>
					{item}
				</Combobox.Option>
			));
		}
	};

	const totalOptions = isGroupedData(filteredGroups)
		? filteredGroups.reduce((acc, group) => acc + group.items.length, 0)
		: filteredGroups.length;

	return (
		<div>
			{label && <label style={{ display: 'block', marginBottom: '8px' }}>{label}</label>}
			<Combobox
				store={combobox}
				onOptionSubmit={(val) => {
					setValue(val);
					setSearch(val);
					combobox.closeDropdown();
					if (onChange) onChange(val);
				}}
			>
				<Combobox.Target>
					<InputBase
						onClick={() => combobox.openDropdown()}
						onFocus={() => combobox.openDropdown()}
						placeholder={placeholder}
						rightSection={<Combobox.Chevron />}
						rightSectionPointerEvents="none"
						style={{ input: { cursor: searchable ? 'text' : 'pointer' } }}
						type={searchable ? undefined : 'button'}
						value={search}
						onBlur={() => {
							combobox.closeDropdown();
							setSearch(value || '');
						}}
						onChange={(event) => {
							combobox.openDropdown();
							combobox.updateSelectedOptionIndex();
							setSearch(event.currentTarget.value);
						}}
					/>
				</Combobox.Target>

				<Combobox.Dropdown>
					<Combobox.Options>
						{totalOptions > 0 ? renderOptions() : <Combobox.Empty>Nothing found</Combobox.Empty>}
					</Combobox.Options>
				</Combobox.Dropdown>
			</Combobox>
		</div>
	);
}
