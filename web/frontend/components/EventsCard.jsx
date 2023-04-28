import { useState } from 'react';
import { Card, TextContainer, Text } from '@shopify/polaris';
import { Toast } from '@shopify/app-bridge-react';
import { useAppQuery, useAuthenticatedFetch } from '../hooks';

export function EventsCard() {
	const emptyToastProps = { content: null };
	const [isLoading, setIsLoading] = useState(true);
	const [toastProps, setToastProps] = useState(emptyToastProps);
	const fetch = useAuthenticatedFetch();

	const {
		data,
		refetch: refetchProductCount,
		isLoading: isLoadingCount,
		isRefetching: isRefetchingCount,
	} = useAppQuery({
		url: '/api/events/count',
		reactQueryOptions: {
			onSuccess: () => {
				setIsLoading(false);
			},
		},
	});

	const toastMarkup = toastProps.content && !isRefetchingCount && (
		<Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
	);

	const handlePopulate = async () => {
		setIsLoading(true);
		const response = await fetch('/api/products/create');

		if (response.ok) {
			await refetchProductCount();
			setToastProps({ content: '5 products created!' });
		} else {
			setIsLoading(false);
			setToastProps({
				content: 'There was an error creating products',
				error: true,
			});
		}
	};

	return (
		<>
			{toastMarkup}
			<Card title="Events Total Counter" sectioned>
				<TextContainer spacing="loose">
					<p>Sample events counter shows the total number of events sent to Alsoa Api</p>
					<Text as="h4" variant="headingMd">
						TOTAL EVENTS
						<Text variant="bodyMd" as="p" fontWeight="semibold">
							{isLoadingCount ? '-' : data.count}
						</Text>
					</Text>
				</TextContainer>
			</Card>
		</>
	);
}
