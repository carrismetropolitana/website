/* * */

import FrontendWrapper from '@/components/FrontendWrapper/FrontendWrapper';

/* * */

export default function Layout({ children, params: { locale } }) {
  return <FrontendWrapper>{children}</FrontendWrapper>;
}
