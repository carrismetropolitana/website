/* * */

import { FavoriteToggle } from '@/components/common/FavoriteToggle';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LineBadge } from '@/components/lines/LineBadge';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { Routes } from '@/utils/routes';
import { Line } from '@carrismetropolitana/api-types/network';
import {
	MantineReactTable,
	type MRT_ColumnDef,
	useMantineReactTable,
} from 'mantine-react-table';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import styles from './style.module.css';

interface LineListDetails {
	area: string
	color: string
	designation: string
	id: string
	is_favorite?: boolean
	name: string
}

/* * */

export function LinesListViewAll() {
	//

	//
	// A. Setup variables

	const linesListContext = useLinesListContext();

	const favoriteLines: string[] = linesListContext.data.favorites.map((line: Line) => line.id);

	const { data: allLocalitiesData } = useSWR(`${Routes.API}/locations/localities`).data;

	const [allLinesParsed, setAllLinesParsed] = useState<LineListDetails[]>([]);
	const t = useTranslations('lines.LinesListViewAll');

	//
	// B. Fetch Data

	const setLineListDetails = (): LineListDetails[] => {
		const parsedLines: LineListDetails[] = [];
		linesListContext.data.filtered.forEach((line) => {
			const localities = line.municipality_ids.map((id) => {
				const locality = allLocalitiesData.filter(locality => locality.municipality_id === id);
				return locality ? locality[0].name : '';
			}).join(', ');

			let area = line.short_name;

			const firstChar = line.id.charAt(0);
			if (!isNaN(Number(firstChar))) {
				area = firstChar;
			}

			const isFavorite = favoriteLines.includes(line.id);

			parsedLines.push({
				area: area,
				color: line.color,
				designation: line.long_name,
				id: line.id,
				is_favorite: isFavorite,
				name: localities,
			});
		});

		setAllLinesParsed(parsedLines);
		return parsedLines;
	};

	const columns: MRT_ColumnDef<LineListDetails>[] = [
		{
			accessorKey: 'id',
			Cell: ({ row }) => {
				return (
					<div className={styles.favoriteToggle}>
						<FavoriteToggle color={row.original.color} isActive={row.original.is_favorite ?? false} onToggle={() => void 0} />
					</div>
				);
			},
			enableColumnActions: false,
			enableColumnFilter: false,
			enableSorting: false,
			header: '',
			mantineTableBodyCellProps: {
				align: 'right',
			},
			size: 40,
		},
		{
			accessorFn: row => `${row.id} - ${row.designation}`,
			accessorKey: 'designation',
			Cell: ({ row }) => {
				return (
					<>
						<LineBadge lineId={row.original.id} />
						<p className={styles.designationName}>{row.original.designation}</p>
					</>
				);
			},
			header: t('header_designation'),
			mantineTableBodyCellProps: {
				align: 'left',
			},
			mantineTableHeadCellProps: {
				align: 'left',
			},
			size: 500,
		},
		{
			accessorKey: 'area',
			header: t('header_area'),
			mantineTableBodyCellProps: {
				align: 'center',
			},
			mantineTableHeadCellProps: {
				align: 'center',
			},
			size: 150,
		},
		{
			accessorKey: 'name',
			header: t('header_municipality'),
			size: 150,
		},
	];

	const table = useMantineReactTable({
		columns,
		data: allLinesParsed,
		enableBottomToolbar: false,
		enableColumnVirtualization: true,
		enableFullScreenToggle: false,
		enableGlobalFilterModes: false,
		enablePagination: false,
		enableRowNumbers: false,
		enableRowVirtualization: true,
		enableStickyHeader: true,
		enableTopToolbar: false,
		initialState: { density: 'xs' },
		mantinePaperProps: {
			style: { boxShadow: 'none' },
			withBorder: false,
		},
		mantineTableBodyCellProps: {
			style: { whiteSpace: 'wrap' },
		},
		mantineTableBodyRowProps: ({ row }) => ({
			onClick: () => {
				handleRowClick(row.original.id);
			},
		}),
		mantineTableContainerProps: {
			height: '100vh',
		},
		mantineTableHeadCellProps: {
			height: 70,
		},
		mantineTableProps: {
			className: styles.table,
			flex: 1,
			withColumnBorders: false,
			withRowBorders: true,
			withTableBorder: false,
		},
	});

	useEffect(() => {
		setLineListDetails();
	}, [linesListContext.data.filtered, allLocalitiesData]);

	//

	// C. Handle Actions
	const handleRowClick = (lineId) => {
		redirect(`/lines/${lineId}`);
	};
	//

	// D. Render components
	if (!linesListContext.data.filtered.length) {
		return (
			<Surface variant="persistent" forceOverflow>
				<Section>
					<NoDataLabel text={t('no_data')} withMinHeight />
				</Section>
			</Surface>
		);
	}

	return (
		<Surface forceOverflow>
			<MantineReactTable table={table} />
		</Surface>
	);

	//
}
