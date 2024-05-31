/* * */

import FrontendBrandSwitcher from '@/components/FrontendBrandSwitcher/FrontendBrandSwitcher';
import FrontendFooter from '@/components/FrontendFooter/FrontendFooter';
// import StatusMessage from '@/components/StatusMessage/StatusMessage';
// import MaintenanceWarning from '@/components/MaintenanceWarning/MaintenanceWarning';

/* * */

export default function Layout({ children }) {
	return (
		<>
			<FrontendBrandSwitcher />
			{/* <StatusMessage /> */}
			{/* <MaintenanceWarning /> */}
			{children}
			<FrontendFooter />
		</>
	);
}
