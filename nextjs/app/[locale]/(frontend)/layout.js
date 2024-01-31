/* * */

import FrontendWrapper from '@/components/FrontendWrapper/FrontendWrapper';
import FrontendBrandSwitcher from '@/components/FrontendBrandSwitcher/FrontendBrandSwitcher';
import FrontendHeader from '@/components/FrontendHeader/FrontendHeader';
import FrontendFooter from '@/components/FrontendFooter/FrontendFooter';
import StatusMessage from '@/components/StatusMessage/StatusMessage';
// import MaintenanceWarning from '@/components/MaintenanceWarning/MaintenanceWarning';

/* * */

export default function Layout({ children }) {
  return (
    <FrontendWrapper>
      <FrontendBrandSwitcher />
      <FrontendHeader />
      <StatusMessage />
      {/* <MaintenanceWarning /> */}
      {children}
      <FrontendFooter />
    </FrontendWrapper>
  );
}
