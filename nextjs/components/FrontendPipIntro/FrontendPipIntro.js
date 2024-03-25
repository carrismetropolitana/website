/* * */

import { useTranslations } from 'next-intl';
import Text from '@/components/Text/Text';

/* * */

export default function FrontendPipIntro() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendPipIntro');

  //
  // B. Render components

  return (
    <div>
      <Text>{t('intro')}</Text>
    </div>
  );

  //
}
