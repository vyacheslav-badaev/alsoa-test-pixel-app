import { useCallback, useEffect, useState } from 'react';
import { Page } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { useAuthenticatedFetch } from '../hooks/index.js';
import { DashboardTabs } from '../components/DashboardTabs.jsx';
import { DashboardContainer } from '../components/dashboard/DashboardContainer.jsx';
import { DashboardSkeleton } from '../components/DashboardSkeleton.jsx';
import { FAQContainer } from '../components/faq/FAQContainer.jsx';
import { ContactUsContainer } from '../components/contactUs/ContactUsContainer.jsx';

export default function HomePage() {
	const authFetch = useAuthenticatedFetch();

	const [shopData, setShopData] = useState({});
	const [loading, setLoading] = useState(true);
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {
		authFetch('/api/shop/profile', {})
			.then((response) => response.json())
			.then((data) => {
				if (data.shop) {
					setShopData(data.shop);
				}
				setLoading(false);
			});
	}, []);

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

	return loading ? (
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
				{selectedTab === 0 && <DashboardContainer shopData={shopData} />}
				{selectedTab === 1 && <FAQContainer />}
				{selectedTab === 2 && <ContactUsContainer />}
			</Page>
		</>
	);
}
