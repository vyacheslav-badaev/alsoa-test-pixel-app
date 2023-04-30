import { Page, Layout } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';

import { EventsCard } from '../components';
import { ShopSettingsForm } from '../components/ShopSettingsForm.jsx';

export default function HomePage() {
	return (
		<Page narrowWidth>
			<TitleBar title="Shopify Pixel Alsoa Test" primaryAction={null} />
			<Layout>
				<Layout.Section>
					<EventsCard />
				</Layout.Section>
				<Layout.Section>
					<ShopSettingsForm />
				</Layout.Section>
			</Layout>
		</Page>
	);
}
