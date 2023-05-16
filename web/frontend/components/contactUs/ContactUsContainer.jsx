import { Layout, LegacyStack, Modal, Text, Toast } from '@shopify/polaris';
import { useState } from 'react';
import { SupportForm } from './SupportForm';
import { useAuthenticatedFetch } from '../../hooks';

import './ContactUsContainer.css';

export function ContactUsContainer() {
	const authFetch = useAuthenticatedFetch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleError = () => setError((prev) => !prev);
	const toggleSuccess = () => setIsModalOpen(true);

	const toastMarkupError = error ? (
		<Toast
			content="Server error"
			error
			onDismiss={toggleError}
			duration={5000}
		/>
	) : null;

	const handleSendForm = async (form) => {
		try {
			setLoading(true);

			authFetch('/api/contact-us', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})
				.then(toggleSuccess)
				.catch(toggleError)
				.finally(() => setLoading(false));
		} catch (error) {
			console.log(error);
		}
		return;
	};

	return (
		<div className="support-container_wrap">
			<Modal
				instant
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Thank you"
			>
				<Modal.Section>
					<p>We will answer you as soon as possible</p>
				</Modal.Section>
			</Modal>

			<Layout>
				<Layout.Section>
					<LegacyStack vertical alignment="center">
						<Text variant="heading2xl" fontWeight="medium" as="h1">
							Have any questions?
						</Text>
						<Text variant="bodyMd" as="p">
							Reach to us
						</Text>
					</LegacyStack>
				</Layout.Section>
				<Layout.Section>
					<SupportForm onSubmit={handleSendForm} loading={loading} />
				</Layout.Section>
			</Layout>
			{toastMarkupError}
		</div>
	);
}
