import { useCallback, useEffect, useState } from 'react';
import { AccountConnection, Toast } from '@shopify/polaris';
import { useAuthenticatedFetch } from '../hooks/index.js';

export function Activate({ currectConnected }) {
	const authFetch = useAuthenticatedFetch();

	const [error, setError] = useState(false);
	const [connected, setConnected] = useState(currectConnected);

	useEffect(() => {
		setConnected(currectConnected);
	}, [currectConnected]);

	const handleActionError = () => setError((prev) => !prev);

	const handleAction = useCallback(() => {
		authFetch(`/api/shop/${connected ? 'deactivate' : 'activate'}`, {
			method: 'POST',
		})
			.then((res) => {
				if (res.status === 200) {
					setConnected(!connected);
				} else {
					handleActionError();
				}
			})
			.catch(handleActionError);
	}, [connected]);

	const buttonText = connected ? 'Deactivate' : 'Activate';
	const details = connected ? 'App is active' : 'App is deactivated';

	const toastMarkupError = error ? (
		<Toast
			content="Server error"
			error
			onDismiss={handleActionError}
			duration={5000}
		/>
	) : null;

	return (
		<>
			<AccountConnection
				connected={connected}
				title="Shopify Pixel Alsoa"
				action={{
					content: buttonText,
					onAction: handleAction,
				}}
				details={details}
			/>
			{toastMarkupError}
		</>
	);
}
