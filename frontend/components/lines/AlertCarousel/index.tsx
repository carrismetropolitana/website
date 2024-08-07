import { Entity } from '@/utils/types';
import { Carousel } from '@mantine/carousel';
import { IconCircleArrowRightFilled, IconInfoCircleFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

export default function Component({ alerts }: { alerts: Entity[] }) {
	const t = useTranslations('line');
	return (
		<div className={styles.alerts}>
			<div className={styles.title}>
				<IconInfoCircleFilled size={20} /> {t('service_alerts')}
			</div>
			<Carousel align="start" slideSize="300" withControls={false}>
				{alerts.map((alert) => {
					const maybeStartDate = alert.alert.activePeriod[0].start;
					const maybeEndDate = alert.alert.activePeriod[0].end;
					let dateStr: null | string = null;
					if (maybeStartDate !== undefined && maybeEndDate !== undefined) {
						const startDayStr = dayjs(maybeStartDate * 1000).format('D MMM. YYYY').toLowerCase();
						const endDayStr = dayjs(maybeEndDate * 1000).format('DD MMM. YYYY').toLowerCase();
						dateStr = t('from_until',
							{
								end: endDayStr,
								start: startDayStr,
							});
					}
					return (
						<Carousel.Slide key={alert.id}>
							<div className={styles.carouselItem}>
								{dateStr && <p>{dateStr}</p>}
								<h4 className={styles.title}>
									{alert.alert.headerText.translation.find(translation => translation.language === 'pt')?.text}
									<IconCircleArrowRightFilled className={styles.icon} size={18} />
								</h4>
							</div>
						</Carousel.Slide>
					);
				})}
			</Carousel>
		</div>
	);
}
