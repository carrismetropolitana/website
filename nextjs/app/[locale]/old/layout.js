/* * */

import FrontendBrandSwitcher from '@/components/FrontendBrandSwitcher/FrontendBrandSwitcher';
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
		</>
	);
}
