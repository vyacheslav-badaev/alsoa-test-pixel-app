import { useEffect, useState } from 'react';
import { Layout } from '@shopify/polaris';
import Driver from 'driver.js';
import { Activate } from './Activate';
import { ShopSettingsForm } from './ShopSettingsForm';
import { useAuthenticatedFetch } from '../../hooks';

import 'driver.js/dist/driver.min.css';

export function DashboardContainer({ shopData }) {
	const authFetch = useAuthenticatedFetch();

	const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(
		shopData?.isOnboardingCompleted || false
	);

	useEffect(() => {
		if (shopData && !isOnboardingCompleted) {
			const driver = new Driver({
				onReset: () => {
					setIsOnboardingCompleted(true);
					authFetch('/api/shop/profile', {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ isOnboardingCompleted: true }),
					});
				},
			});

			driver.defineSteps([
				{
					element: '#activate',
					popover: {
						title: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at metus sodales pharetra</p>`,
						description: '',
						position: "right",
					},
				},
				{
					element: '#tiktokSettings',
					popover: {
						title: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at metus sodales pharetra</p>`,
						description: '',
						position: "right",
					},
				},
				{
					element: '#facebookSettings',
					popover: {
						title: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at metus sodales pharetra</p>`,
						description: '',
						position: "right",
					},
				},
				{
					element: '#snapchatSettings',
					popover: {
						title: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at metus sodales pharetra</p>`,
						description: '',
						position: "right",
					},
				},
				{
					element: '#pinterestSettings',
					popover: {
						title: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at metus sodales pharetra</p>`,
						description: '',
						position: "right",
					},
				},
			]);

			driver.start();
		}
	}, []);

	return (
		<Layout>
			<Layout.Section>
				<div id="activate">
					<Activate currectConnected={!!shopData.pixelId} />
				</div>
			</Layout.Section>
			<Layout.Section>
				<div id="tiktokSettings">
					<ShopSettingsForm
						title={'TikTok Pixel Setting'}
						idFieldTitle={'TikTok Pixel ID(CH5NK0RC77U3VDB5LAM0)'}
						tokenFieldTitle={
							'TikTok Access Token(e59e085c6d485952b341b2b4028d3f14230e6795)'
						}
						currentId={shopData.tiktokPixelId}
						currentToken={shopData.tiktokAccessToken}
						idPropertyName={'tiktokPixelId'}
						tokenPropertyName={'tiktokAccessToken'}
					/>
				</div>
			</Layout.Section>
			<Layout.Section>
				<div id="facebookSettings">
					<ShopSettingsForm
						title={'Facebook Pixel Setting'}
						idFieldTitle={'Facebook Pixel ID(238713671941753)'}
						tokenFieldTitle={
							'Facebook Access Token(EAAKCaXnfa14BAFKnODBLtVwOAwlQvDWiF4nGeu52fHhsuSg69boDl3zywOtZC5lZC55qf8PcylUhoxL0SCGvTMUBEuTnGE3yefXO8wYxYc17mIMW1vGNQzhJv27qyI8BFlMMnylHYYzenqZCU3AYTVYOlaSOSwIhWQtp5VKWCd0828Y1w1M)'
						}
						currentId={shopData.facebookPixelId}
						currentToken={shopData.facebookAccessToken}
						idPropertyName={'facebookPixelId'}
						tokenPropertyName={'facebookAccessToken'}
					/>
				</div>
			</Layout.Section>
			<Layout.Section>
				<div id="snapchatSettings">
					<ShopSettingsForm
						title={'Snapchat Pixel Setting'}
						idFieldTitle={
							'Snapchat Pixel ID(2f5e5b5c-92f0-462f-a715-a00f17ec7eec)'
						}
						tokenFieldTitle={
							'Snapchat Access Token(eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjc3NjM0NTgxLCJzdWIiOiI3NWIyOGVkYy1jYjg3LTQzYWItYjI5NC03Y2U0ZWE4ZWI2MmF-UFJPRFVDVElPTn4xMWE4YjNjNC01ZjQ5LTRkZGYtODc2MS1mOTMxMDNhMWI3NmUifQ.m6okR_GvZTovChQnWCbXS0Obgd1jD_QHmUl5daQRya8)'
						}
						currentId={shopData.snapchatPixelId}
						currentToken={shopData.snapchatAccessToken}
						idPropertyName={'snapchatPixelId'}
						tokenPropertyName={'snapchatAccessToken'}
					/>
				</div>
			</Layout.Section>
			<Layout.Section>
				<div id="pinterestSettings">
					<ShopSettingsForm
						title={'Pinterest Setting'}
						idFieldTitle={'Pinterest API Key(549765646419)'}
						tokenFieldTitle={
							'Pinterest Access Token(pina_AIA2RFAWAB6EQAQAGBACIDXQYRIZXBYBAAAAALTNVE3GHS7LRBMWGQOQTFFCBQS3TGAJEHLXUS33FBWWCQCPXPOSAYMTYJYA)'
						}
						currentId={shopData.pinterestApiKey}
						currentToken={shopData.pinterestAccessToken}
						idPropertyName={'pinterestApiKey'}
						tokenPropertyName={'pinterestAccessToken'}
					/>
				</div>
			</Layout.Section>
		</Layout>
	);
}
