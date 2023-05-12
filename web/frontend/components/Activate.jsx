import { useEffect, useState } from 'react';
import { AccountConnection, Toast, Spinner } from '@shopify/polaris';
import { useAuthenticatedFetch } from '../hooks/index.js';

export function Activate({ currectConnected }) {
	const authFetch = useAuthenticatedFetch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		setConnected(currectConnected);
	}, [currectConnected]);

	const handleActionError = () => setError((prev) => !prev);

	const handleAction = () => {
		if(loading)	return;
		setLoading(true);
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
			.catch(handleActionError)
			.finally(() => setLoading(false));
	};

	const buttonText = loading ? <Spinner accessibilityLabel="Loading..." size="small" />: connected ? 'Deactivate' : 'Activate';
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
			<div className={'accountActiveWrapper'}>
				<AccountConnection
					connected={connected}
					title="Shopify Pixel Alsoa"
					action={{
						content: buttonText,
						onAction: handleAction,
					}}
					details={details}
				/>
			</div>
			{toastMarkupError}
		</>
	);
}
