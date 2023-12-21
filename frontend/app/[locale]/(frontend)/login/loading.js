/* * */

import Loader from '@/components/Loader/Loader';
import Section from '@/components/FrontendSection/FrontendSection';

/* * */

export default function Loading() {
  return (
    <Section first>
      <Loader visible full />
    </Section>
  );
}
