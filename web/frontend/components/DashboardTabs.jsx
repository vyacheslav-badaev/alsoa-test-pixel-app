import { Tabs } from '@shopify/polaris';

export function DashboardTabs ({ tabs, selectedTabIndex, onTabChange }) {
	return (
		<div>
			<Tabs
				tabs={tabs}
				selected={selectedTabIndex}
				onSelect={onTabChange}
				fitted
			/>
		</div>
	);
};
