'use client';
/* * */

import type { Line } from '@/utils/types';

import segmentedStyles from '@/components/common/CustomSegmentedControl/styles.module.css';
import inputStyles from '@/components/common/Input/styles.module.css';
import { Input, SegmentedControl, Skeleton } from '@mantine/core';
import { IconArrowLoopLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import useSWR from 'swr';

import FavoritesList from './FavoritesList';
import VirtualizedList from './VirtualizedList';
import styles from './styles.module.css';

/* * */

export default function Component() {
	const t = useTranslations('lines');
	const tabs = [{
		label: t('all_lines'),
		value: 'all_lines',
	}, {
		label: t('favorites'),
		value: 'favorites',
	}];
	const [tab, setTab] = useState('all_lines');
	const { data } = useSWR<Line[]>('https://api.carrismetropolitana.pt/lines');

	const [searchText, setSearchText] = useState('');
	const [foundNumber, setFoundNumber] = useState(0);
	const ref = useRef<HTMLInputElement>(null);

	return (
		<>
			<div className={styles.header}>
				<h1>Pesquisar Linhas</h1>
				<SegmentedControl classNames={segmentedStyles} data={tabs} onChange={setTab} value={tab} fullWidth />
				{ tab === 'all_lines' && (
					<form
						className={styles.filter}
						onSubmit={(e) => {
							e.preventDefault();
							return false;
						}}
					>
						<Input
							ref={ref}
							className={styles.input}
							classNames={inputStyles}
							leftSection={<IconArrowLoopLeft size={16} />}
							onChange={event => setSearchText(event.currentTarget.value)}
							placeholder={t('search_by')}
							size="lg"
							type="search"
							value={searchText}
							onKeyDown={(event) => {
								if (event.key === 'Escape') setSearchText('');
								if (event.key === 'Enter') {
									ref.current?.blur();
								}
							}}
						/>
						<div className={styles.expand}>{t('expand_filters')}</div>
						{data !== undefined ? (
							<div className={styles.foundSummary}>{t('found_x_lines', { count: foundNumber })}:</div>)
							: (<Skeleton height={16} radius="xl" width={200} />
							)}
					</form>
				)}
			</div>
			<div className={styles.lines}>
				{
					data !== undefined && tab === 'all_lines' && (
						<VirtualizedList data={data} searchText={searchText} setFoundNumber={setFoundNumber} />
					)
				}
				{
					data !== undefined && tab === 'favorites' && (
						<FavoritesList data={data} />)
				}
			</div>
		</>
	);
}
