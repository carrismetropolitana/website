/* * */
import { StopInquirySection } from '@/components/stops/StopInquirySection';
import { useTranslations } from 'next-intl';
/* * */

export function StopInquiry() {
	//

	//

	// A. Setup Variables
	const t = useTranslations('stops.Inquiry');
	//

	// B. Render Components
	return (
		<StopInquirySection description={t('description')} title={t('title')} />
	);
	//
}
