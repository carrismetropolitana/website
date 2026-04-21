'use client';

/* * */

import { AlertsSection } from '@/components/home/AlertsSection';
import { MainCarousel } from '@/components/home/MainCarousel';
import { MetricsSection } from '@/components/home/MetricsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { QuickSearch } from '@/components/home/QuickSearch';
import { SchedulesSection } from '@/components/home/SchedulesSection';
import { SupportSection } from '@/components/home/SupportSection';
import { TarifsSection } from '@/components/home/TarifsSection';
import { Grid } from '@/components/layout/Grid';
import { PeriodsWidget } from '@/components/periods/PeriodsWidget';
import { BreakpointDesktop } from '@/components/responsive/BreakpointSwitch';
import { MetricsContextProvider } from '@/contexts/Metrics.context';

import styles from './styles.module.css';

/* * */

export function HomePage() {
	return (
		<MetricsContextProvider>
			<Grid columns="ab" withGap>
				<BreakpointDesktop>
					<QuickSearch />
				</BreakpointDesktop>
				<div className={styles.carouselWrapper}>
					<MainCarousel />
				</div>
			</Grid>
			<SchedulesSection />
			<PeriodsWidget />
			<AlertsSection />
			<NewsSection />
			<TarifsSection />
			<SupportSection />
			<MetricsSection />
			<ProjectsSection />
		</MetricsContextProvider>
	);
}
