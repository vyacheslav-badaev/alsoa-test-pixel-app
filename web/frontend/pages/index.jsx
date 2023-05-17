import { useCallback, useState } from 'react';
import { Page } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { useAppQuery } from '../hooks/index.js';
import { DashboardTabs } from '../components/DashboardTabs.jsx';
import { DashboardContainer } from '../components/dashboard/DashboardContainer.jsx';
import { DashboardSkeleton } from '../components/DashboardSkeleton.jsx';
import { FAQContainer } from '../components/faq/FAQContainer.jsx';
import { ContactUsContainer } from '../components/contactUs/ContactUsContainer.jsx';

export default function HomePage() {
	const [selectedTab, setSelectedTab] = useState(0);

	const {
		data: responseShopData,
		refetch: refetchShop,
		isLoading: isLoadingShop,
		isRefetching: isRefetchingShop,
	} = useAppQuery({
		url: '/api/shop/profile',
	});

	const tabs = [
		{
			id: 'dashboard-id',
			content: 'Dashboard',
			panelID: 'dashboard-content-1',
		},
		{
			id: 'faq-id',
			content: 'FAQ',
			panelID: 'faq-1',
		},
		{
			id: 'contact-us-id',
			content: 'Contact Us',
			panelID: 'contact-us-content-1',
		},
	];

	const handleTabChange = useCallback((selectedTabIndex) => {
		setSelectedTab(selectedTabIndex);
	}, []);

	return isLoadingShop || !responseShopData?.shop ? (
		<DashboardSkeleton />
	) : (
		<>
			<DashboardTabs
				tabs={tabs}
				selectedTabIndex={selectedTab}
				onTabChange={handleTabChange}
			></DashboardTabs>
			<Page narrowWidth>
				<TitleBar title="Shopify Pixel Alsoa" primaryAction={null} />
				{selectedTab === 0 && (
					<DashboardContainer
						shopData={responseShopData.shop}
						refetchShop={refetchShop}
					/>
				)}
				{selectedTab === 1 && <FAQContainer />}
				{selectedTab === 2 && <ContactUsContainer />}
			</Page>
		</>
	);
}
