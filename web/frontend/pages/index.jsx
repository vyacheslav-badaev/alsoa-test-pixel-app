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
				{/* <Layout.Section>
					<EventsCard />
				</Layout.Section> */}
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
				<Layout.Section>
					<ShopSettingsForm
						title={'Snapchat Pixel Setting'}
						idFieldTitle={
							'Snapchat Pixel ID(2f5e5b5c-92f0-462f-a715-a00f17ec7eec)'
						}
						tokenFieldTitle={
							'Snapchat Access Token(eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjc3NjM0NTgxLCJzdWIiOiI3NWIyOGVkYy1jYjg3LTQzYWItYjI5NC03Y2U0ZWE4ZWI2MmF-UFJPRFVDVElPTn4xMWE4YjNjNC01ZjQ5LTRkZGYtODc2MS1mOTMxMDNhMWI3NmUifQ.m6okR_GvZTovChQnWCbXS0Obgd1jD_QHmUl5daQRya8)'
						}
						idPropertyName={'snapchatPixelId'}
						tokenPropertyName={'snapchatAccessToken'}
					/>
				</Layout.Section>
				<Layout.Section>
					<ShopSettingsForm
						title={'Pinterest Setting'}
						idFieldTitle={'Pinterest API Key(549765646419)'}
						tokenFieldTitle={
							'Pinterest Access Token(pina_AIA2RFAWAB6EQAQAGBACIDXQYRIZXBYBAAAAALTNVE3GHS7LRBMWGQOQTFFCBQS3TGAJEHLXUS33FBWWCQCPXPOSAYMTYJYA)'
						}
						idPropertyName={'pinterestPixelId'}
						tokenPropertyName={'pinterestAccessToken'}
					/>
				</Layout.Section>
			</Layout>
		</Page>
	);
}
