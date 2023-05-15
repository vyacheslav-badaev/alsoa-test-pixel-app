import { useState, useEffect } from 'react';
import {
	AlphaCard,
	FormLayout,
	TextField,
	Form,
	Button,
	Toast,
} from '@shopify/polaris';
import { useAuthenticatedFetch } from '../../hooks/index.js';

export function ShopSettingsForm({
	title,
	idFieldTitle,
	tokenFieldTitle,
	currentId,
	currentToken,
	idPropertyName,
	tokenPropertyName,
}) {
	const authFetch = useAuthenticatedFetch();
	const [pixelId, setPixelId] = useState(currentId || '');
	const [accessTokenId, setAccessTokenId] = useState(currentToken || '');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const isDisabled = !pixelId || !accessTokenId;

	useEffect(() => {
		setPixelId(currentId || '');
		setAccessTokenId(currentToken || '');
	}, [currentId, currentToken]);

	const toggleError = () => setError((prev) => !prev);
	const toggleSuccess = () => setSuccess((prev) => !prev);

	const handleSubmit = () => {
		if (pixelId && accessTokenId) {
			authFetch('/api/shop/profile', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					[idPropertyName]: pixelId,
					[tokenPropertyName]: accessTokenId,
				}),
			})
				.then(toggleSuccess)
				.catch(toggleError);
		}
	};

	const toastMarkupError = error ? (
		<Toast
			content="Server error"
			error
			onDismiss={toggleError}
			duration={5000}
		/>
	) : null;

	const toastMarkupSuccess = success ? (
		<Toast content="Success" onDismiss={toggleSuccess} duration={5000} />
	) : null;

	return (
		<AlphaCard title={title} sectioned>
			<Form onSubmit={handleSubmit}>
				<FormLayout>
					<TextField
						label={idFieldTitle}
						requiredIndicator
						onChange={setPixelId}
						value={pixelId}
					/>
					<TextField
						label={tokenFieldTitle}
						requiredIndicator
						onChange={setAccessTokenId}
						value={accessTokenId}
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
