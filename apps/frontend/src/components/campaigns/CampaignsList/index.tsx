'use client';

/* * */

import { CampaignsCard } from '@/components/campaigns/CampaignsCard';
import { CampaignsCardSkeleton } from '@/components/campaigns/CampaignsCardSkeleton';
import { BackButton } from '@/components/common/BackButton';
import { Grid } from '@/components/layout/Grid';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useCampaignsListContext } from '@/contexts/CampaignsList.context';

/* * */

export function CampaignsList() {
	//

	//
	// A. Setup variables

	const campaignsListContext = useCampaignsListContext();

	//
	// B. Render components

	return (
		<Surface>

			<Section withBottomDivider withPadding>
				<BackButton href="/" />
			</Section>

			{campaignsListContext.flags.is_loading && (
				<Section withPadding>
					<Grid columns="abcd" withGap>
						{Array(16).fill(null).map((_, index) =>
							<CampaignsCardSkeleton key={index} />,
						)}
					</Grid>
				</Section>
			)}

			{!campaignsListContext.flags.is_loading && campaignsListContext.data.filtered.length > 0 && (
				<Section withPadding>
					<Grid columns="abcd" withGap>
						{campaignsListContext.data.filtered.map(campaignItem => (
							<CampaignsCard
								key={campaignItem.id}
								id={campaignItem.slug}
								title={campaignItem.title}
							/>
						))}
					</Grid>
				</Section>
			)}

			{!campaignsListContext.flags.is_loading && campaignsListContext.data.filtered.length === 0 && (
				<Section withPadding>
					<Grid columns="a" withGap>
						<NoDataLabel fill />
					</Grid>
				</Section>
			)}
		</Surface>
	);

	//
}
