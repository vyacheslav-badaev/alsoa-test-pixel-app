import { useEffect, useState } from 'react';
import { Layout } from '@shopify/polaris';
import Driver from 'driver.js';
import { Activate } from './Activate';
import { ShopSettingsForm } from './ShopSettingsForm';
import { useAuthenticatedFetch } from '../../hooks';

import 'driver.js/dist/driver.min.css';

export function DashboardContainer({ shopData, refetchShop, isRefetching }) {
	const authFetch = useAuthenticatedFetch();

	const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(
		shopData.isOnboardingCompleted || false
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
					refetchShop();
				},
			});

			driver.defineSteps([
				{
					element: '#activate',
					popover: {
						title: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at metus sodales pharetra</p>`,
						description: '',
						position: 'right',
					},
				},
				{
					element: '#tiktokSettings',
					popover: {
						title: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at metus sodales pharetra</p>`,
						description: '',
						position: 'right',
					},
				},
				{
					element: '#facebookSettings',
					popover: {
						title: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at metus sodales pharetra</p>`,
						description: '',
						position: 'right',
					},
				},
				{
					element: '#snapchatSettings',
					popover: {
						title: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at metus sodales pharetra</p>`,
						description: '',
						position: 'right',
					},
				},
				{
					element: '#pinterestSettings',
					popover: {
						title: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at metus sodales pharetra</p>`,
						description: '',
						position: 'right',
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
					<Activate
						currectConnected={!!shopData.pixelId}
						refetchShop={refetchShop}
					/>
				</div>
			</Layout.Section>
			<Layout.Section>
				<div id="tiktokSettings">
					<ShopSettingsForm
						title={'TikTok Pixel Setting'}
						idFieldTitle={'TikTok Pixel ID'}
						tokenFieldTitle={'TikTok Access Token'}
						currentId={shopData.tiktokPixelId}
						currentToken={shopData.tiktokAccessToken}
						idPropertyName={'tiktokPixelId'}
						tokenPropertyName={'tiktokAccessToken'}
						refetchShop={refetchShop}
						isRefetching={isRefetching}
					/>
				</div>
			</Layout.Section>
			<Layout.Section>
				<div id="facebookSettings">
					<ShopSettingsForm
						title={'Facebook Pixel Setting'}
						idFieldTitle={'Facebook Pixel ID'}
						tokenFieldTitle={'Facebook Access Token'}
						currentId={shopData.facebookPixelId}
						currentToken={shopData.facebookAccessToken}
						idPropertyName={'facebookPixelId'}
						tokenPropertyName={'facebookAccessToken'}
						refetchShop={refetchShop}
						isRefetching={isRefetching}
					/>
				</div>
			</Layout.Section>
			<Layout.Section>
				<div id="snapchatSettings">
					<ShopSettingsForm
						title={'Snapchat Pixel Setting'}
						idFieldTitle={'Snapchat Pixel ID'}
						tokenFieldTitle={'Snapchat Access Token'}
						currentId={shopData.snapchatPixelId}
						currentToken={shopData.snapchatAccessToken}
						idPropertyName={'snapchatPixelId'}
						tokenPropertyName={'snapchatAccessToken'}
						refetchShop={refetchShop}
						isRefetching={isRefetching}
					/>
				</div>
			</Layout.Section>
			<Layout.Section>
				<div id="pinterestSettings">
					<ShopSettingsForm
						title={'Pinterest Setting'}
						idFieldTitle={'Pinterest API Key'}
						tokenFieldTitle={
							'Pinterest Access Token'
						}
						currentId={shopData.pinterestApiKey}
						currentToken={shopData.pinterestAccessToken}
						idPropertyName={'pinterestApiKey'}
						tokenPropertyName={'pinterestAccessToken'}
						refetchShop={refetchShop}
						isRefetching={isRefetching}
					/>
				</div>
			</Layout.Section>
		</Layout>
	);
}
