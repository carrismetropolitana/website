/* * */

import { Loader } from '@/components/common/Loader';
import { Grid } from '@/components/layout/Grid';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { PipsStopDetail } from '@/components/pips-survey/PipsStopDetail';
import { usePipsContext } from '@/contexts/Pips.context';
import { useTranslations } from 'next-intl';

/* * */

export function PipsStopsList() {
	//

	//
	// A. Setup variables

	const pipsContext = usePipsContext();
	const t = useTranslations('PipsSurvey.stops_list');
	const pipData = pipsContext.data.pipData;
	const stopIds = pipData?.stop_ids ?? [];

	//
	// B. Render components

	if (pipsContext.flags.is_loading || !pipData) {
		return (
			<Section withGap withPadding>
				<Loader visible />
			</Section>
		);
	}

	if (!stopIds.length) {
		return (
			<Section withGap withPadding>
				<NoDataLabel text={t('no_data')} />
			</Section>
		);
	}

	return (
		<Section withGap withPadding>
			<Grid columns="abcd" withGap>
				{stopIds.map(stopId => (
					<PipsStopDetail key={stopId} stopId={stopId} />
				))}
			</Grid>
		</Section>
	);
}
