import { AlertsCarousel } from '@/components/common/AlertsCarousel';
import { FavoriteToggle } from '@/components/common/FavoriteToggle';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { RegularListItem } from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LineBadge } from '@/components/lines/LineBadge';
import { LineName } from '@/components/lines/LineName';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { useProfileContext } from '@/contexts/Profile.context';
import toast from '@/utils/toast';
import { Tooltip } from '@mantine/core';
import { IconInfoTriangle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

// IDs das linhas que servem as praias da Arrábida (deduplicated and sorted)
const ARRABIDA_LINE_IDS = [
	'4414', // Albarquel
	'4415', // Albarquel, ITS
	'4470', // Creiro, ITS
	'4471', // Albarquel
	'4474', // Figueirinha, Albarquel
	'4477', // Galápos, Galapinhos, Creiro
];

export function ArrabidaList() {
	//
	// A. Setup variables

	const linesListContext = useLinesListContext();
	const profileContext = useProfileContext();
	const alertsContext = useAlertsContext();
	const t = useTranslations('arrabida.ArrabidaList');

	const stableItems = useMemo(() => {
		if (!linesListContext.data.filtered?.length) return [];

		const linesMap = new Map(linesListContext.data.filtered.map(line => [line.id, line]));
		return ARRABIDA_LINE_IDS
			.map(lineId => linesMap.get(lineId))
			.filter(Boolean) as typeof linesListContext.data.filtered;
	}, [linesListContext.data.filtered]);

	//
	// B. Handle actions

	const handleToggleFavorite = async (lineId: string, lineName: string) => {
		try {
			const wasFavorite = profileContext.data.favorite_lines?.includes(lineId) || false;
			await profileContext.actions.toggleFavoriteLine(lineId);

			if (wasFavorite) {
				toast.success({ message: t('favorite_removed') + `: ${lineName}` });
			}
			else {
				toast.success({ message: t('favorite_added') + `: ${lineName}` });
			}
		}
		catch (error) {
			console.error('Erro ao alterar favorito:', error);
			toast.error({ message: 'Ocorreu um erro ao alterar os favoritos' });
		}
	};

	//
	// C. Render components

	if (!stableItems.length) {
		return (
			<div id="lines">
				<Surface variant="persistent" forceOverflow>
					<Section heading={t('title')} subheading={t('subtitle')} withGap withPadding>
						<NoDataLabel text={t('no_data', { defaultValue: 'Sem dados disponíveis' })} withMinHeight />
					</Section>
				</Surface>
			</div>
		);
	}

	return (
		<div className={styles.arrabidaListContainer} id="lines">
			<Surface variant="persistent" forceOverflow>
				<Section heading={t('title')} subheading={t('subtitle')} withGap withPadding>
					<ul className={styles.listContainer} style={{ height: '100%', width: '100%' }}>
						{stableItems.map((item, index, array) => {
							const isFavorite = profileContext.data.favorite_lines?.includes(item.id) || false;
							const alerts = alertsContext.actions.getSimplifiedAlertsByLineId(item.id);
							const hasAlert = alerts.length > 0;
							const isLastItem = index === array.length - 1;

							return (
								<li key={item.id} className={`${styles.listItemWrapper} ${isLastItem ? styles.lastItem : ''}`}>
									<RegularListItem href={`/lines/${item.id}`} style={{ height: '100%', width: '100%' }}>

										<div className={styles.itemContainer}>
											<div className={styles.lineInfo} style={{ flex: 1 }}>
												<LineBadge
													lineData={item}
													size="md"
												/>
												<LineName lineData={item} />
											</div>
											<div className={styles.actions} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
												{hasAlert && (
													<Tooltip
														label={t('has_alerts')}
														position="top"
														withArrow
													>
														<div className={styles.alertIcon}>
															<IconInfoTriangle size={20} />
														</div>
													</Tooltip>
												)}
												<Tooltip
													label={t('toggle_favorite')}
													position="top"
													withArrow
												>
													<div
														onClick={(event) => {
															event.preventDefault();
															event.stopPropagation();
														}}
														onMouseDown={(event) => {
															event.preventDefault();
															event.stopPropagation();
														}}
													>
														<FavoriteToggle
															color={item.color}
															isActive={isFavorite}
															onToggle={() => {
																handleToggleFavorite(item.id, item.long_name);
															}}
														/>
													</div>
												</Tooltip>
											</div>
										</div>
									</RegularListItem>

									{hasAlert && (
										<div className={styles.alertsSurfaceOverride}>
											<Surface variant="alerts">
												<Section withGap>
													<AlertsCarousel alerts={alerts} />
												</Section>
											</Surface>
										</div>
									)}
								</li>
							);
						})}
					</ul>
				</Section>
			</Surface>
		</div>
	);
}

export default ArrabidaList;
