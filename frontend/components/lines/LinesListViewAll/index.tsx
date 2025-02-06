/* * */

import { FavoriteToggle } from '@/components/common/FavoriteToggle';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LineBadge } from '@/components/lines/LineBadge';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { Routes } from '@/utils/routes';
import toast from '@/utils/toast';
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
	// A. Setup variables

	const linesListContext = useLinesListContext();
	const profileContext = useProfileContext();
	const favoriteLines: string[] = linesListContext.data.favorites.map((line: Line) => line.id);
	const { data: allLocalitiesData } = useSWR(`${Routes.API}/locations/localities`).data;
	const t = useTranslations('lines.LinesListViewAll');
	const [allLinesParsed, setAllLinesParsed] = useState<LineListDetails[]>([]);

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

			if (line.id.startsWith('1')) {
				area = '1';
			}
			else if (line.id.startsWith('2')) {
				area = '2';
			}
			else if (line.id.startsWith('3')) {
				area = '3';
			}
			else if (line.id.startsWith('4')) {
				area = '4';
			}
			else if (line.id.startsWith('5')) {
				area = '5';
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
			Cell: ({ renderedCellValue, row }) => {
				return (
					<>
						<div className={styles.favoriteToggle}>
							<FavoriteToggle color={row.original.color} isActive={row.original.is_favorite ?? false} onToggle={() => { handleToggleFavorite(renderedCellValue); }} />
						</div>
						<LineBadge lineId={renderedCellValue?.toString()} />
					</>
				);
			},
			header: t('header_number'),
			size: 100,
		},
		{
			accessorKey: 'designation',
			header: t('header_designation'),
			size: 400,
		},
		{
			accessorKey: 'area',
			header: t('header_area'),
			size: 100,
		},
		{
			accessorKey: 'name',
			header: t('header_municipality'),
			maxSize: 350,
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
		enableTopToolbar: false,
		initialState: { density: 'xs' },
		mantinePaperProps: {
			style: { boxShadow: 'none' },
			withBorder: false,
		},
		mantineTableBodyRowProps: ({ row }) => ({
			onClick: () => {
				handleRowClick(row.original.id);
			},
		}),
		mantineTableProps: {
			style: { overflow: 'visible' },
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

	const handleToggleFavorite = async (lineId) => {
		if (!lineId) return;
		try {
			await profileContext.actions.toggleFavoriteLine(lineId);
		}
		catch (error) {
			toast.error({ message: t('toggle_favorite_error', { error: error.message }) });
		}
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
