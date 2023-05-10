import { Page, Layout } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';

import { EventsCard } from '../components';
import { ShopSettingsForm } from '../components/ShopSettingsForm.jsx';

export default function HomePage() {
	return (
		<Page narrowWidth>
			<TitleBar title="Shopify Pixel Alsoa" primaryAction={null} />
			<Layout>
				<Layout.Section>
					<EventsCard />
				</Layout.Section>
				<Layout.Section>
					<ShopSettingsForm
						title={'TikTok Pixel Setting'}
						idFieldTitle={'TikTok Pixel ID(CH5NK0RC77U3VDB5LAM0)'}
						tokenFieldTitle={
							'TikTok Access Token(e59e085c6d485952b341b2b4028d3f14230e6795)'
						}
						idPropertyName={'tiktokPixelId'}
						tokenPropertyName={'tiktokAccessToken'}
					/>
				</Layout.Section>
				<Layout.Section>
					<ShopSettingsForm
						title={'Facebook Pixel Setting'}
						idFieldTitle={'Facebook Pixel ID(238713671941753)'}
						tokenFieldTitle={
							'Facebook Access Token(EAAKCaXnfa14BAFKnODBLtVwOAwlQvDWiF4nGeu52fHhsuSg69boDl3zywOtZC5lZC55qf8PcylUhoxL0SCGvTMUBEuTnGE3yefXO8wYxYc17mIMW1vGNQzhJv27qyI8BFlMMnylHYYzenqZCU3AYTVYOlaSOSwIhWQtp5VKWCd0828Y1w1M)'
						}
						idPropertyName={'facebookPixelId'}
						tokenPropertyName={'facebookAccessToken'}
					/>
				</Layout.Section>
			</Layout>
		</Page>
	);
}
