import { useState, useEffect } from 'react';
import { AlphaCard, FormLayout, TextField, Form, Button, Toast } from '@shopify/polaris';
import { useAuthenticatedFetch } from '../hooks/index.js';

export function ShopSettingsForm() {
	const authFetch = useAuthenticatedFetch();
	const [pixelTikTokId, setPixelTikTokId] = useState('');
	const [accessTokenTikTokId, setAccessTokenTikTokId] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const isDisabled = !pixelTikTokId || !accessTokenTikTokId;

	useEffect(() => {
		authFetch('/api/profile', {})
			.then((response) => response.json())
			.then((data) => {
				if (data.shop) {
					setPixelTikTokId(data?.shop?.tiktokPixelId || '');
					setAccessTokenTikTokId(data?.shop?.tiktokAccessToken || '');
				}
			});
	}, []);

	const toggleError = () => setError((prev) => !prev);
	const toggleSuccess = () => setSuccess((prev) => !prev);

	const handleSubmit = () => {
		if (pixelTikTokId && accessTokenTikTokId) {
			authFetch('/api/profile', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					tiktokPixelId: pixelTikTokId,
					tiktokAccessToken: accessTokenTikTokId,
				}),
			})
				.then(toggleSuccess)
				.catch(toggleError);
		}
	};

	const toastMarkupError = error ? (
		<Toast content="Server error" error onDismiss={toggleError} duration={5000} />
	) : null;

	const toastMarkupSuccess = success ? (
		<Toast content="Success" onDismiss={toggleSuccess} duration={5000} />
	) : null;

	return (
		<AlphaCard title="TikTok Pixel Setting" sectioned>
			<Form onSubmit={handleSubmit}>
				<FormLayout>
					<TextField
						label="TikTok Pixel ID(CH5NK0RC77U3VDB5LAM0)"
						requiredIndicator
						onChange={setPixelTikTokId}
						value={pixelTikTokId}
					/>
					<TextField
						label="TikTok Access Token(e59e085c6d485952b341b2b4028d3f14230e6795)"
						requiredIndicator
						onChange={setAccessTokenTikTokId}
						value={accessTokenTikTokId}
					/>
					<Button submit disabled={isDisabled}>
						Save
					</Button>
				</FormLayout>
			</Form>
			<>
				{toastMarkupError}
				{toastMarkupSuccess}
			</>
		</AlphaCard>
	);
}
