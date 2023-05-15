import { useState, useCallback } from 'react';
import {
	LegacyCard,
	Collapsible,
	LegacyStack,
	Button,
	Text,
} from '@shopify/polaris';
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';

import './HelpItem.css';

export const HelpItem = ({ title, description, isOpen }) => {
	const [open, setOpen] = useState(isOpen ?? false);

	const handleToggle = useCallback(() => setOpen((open) => !open), []);

	return (
		<LegacyCard>
			<LegacyCard>
				<LegacyCard.Section>
					<div className="help-item_header" onClick={handleToggle}>
						<LegacyStack distribution="equalSpacing" alignment="center">
							<Text variant="headingMd" as="h3">
								{title}
							</Text>
							<Button
								ariaExpanded={open}
								ariaControls="basic-collapsible"
								icon={open ? ChevronUpMinor : ChevronDownMinor}
								plain
							/>
						</LegacyStack>
					</div>
				</LegacyCard.Section>
				<Collapsible
					open={open}
					id="basic-collapsible"
					transition={{
						duration: '500ms',
						timingFunction: 'ease-in-out',
					}}
					expandOnPrint
				>
					<div className="help-item-body_wrap">{description}</div>
				</Collapsible>
			</LegacyCard>
		</LegacyCard>
	);
};
