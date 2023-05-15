import { Layout, LegacyStack, Text } from '@shopify/polaris';
import { HelpItem } from './HelpItem';

import './FAQContainer.css';

export function FAQContainer() {
	const questions = [
		{
			question: 'Lorem ipsum dolor sit amet?',
			answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Quisque euismod dolor ut erat molestie, ut maximus nisi vestibulum. 
        Vivamus ac ultricies mauris. Vestibulum luctus urna ligula, vel 
        finibus arcu aliquam vel. Sed ut leo gravida, facilisis eros ac, 
        fringilla odio. Nulla a purus sit amet tellus elementum dapibus.`,
		},
		{
			question: 'Lorem ipsum dolor sit amet?',
			answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Quisque euismod dolor ut erat molestie, ut maximus nisi vestibulum. 
        Vivamus ac ultricies mauris. Vestibulum luctus urna ligula, vel 
        finibus arcu aliquam vel. Sed ut leo gravida, facilisis eros ac, 
        fringilla odio. Nulla a purus sit amet tellus elementum dapibus.`,
		},
		{
			question: 'Lorem ipsum dolor sit amet?',
			answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Quisque euismod dolor ut erat molestie, ut maximus nisi vestibulum. 
        Vivamus ac ultricies mauris. Vestibulum luctus urna ligula, vel 
        finibus arcu aliquam vel. Sed ut leo gravida, facilisis eros ac, 
        fringilla odio. Nulla a purus sit amet tellus elementum dapibus.`,
		},
		{
			question: 'Lorem ipsum dolor sit amet?',
			answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Quisque euismod dolor ut erat molestie, ut maximus nisi vestibulum. 
        Vivamus ac ultricies mauris. Vestibulum luctus urna ligula, vel 
        finibus arcu aliquam vel. Sed ut leo gravida, facilisis eros ac, 
        fringilla odio. Nulla a purus sit amet tellus elementum dapibus.`,
		},
		{
			question: 'Lorem ipsum dolor sit amet?',
			answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Quisque euismod dolor ut erat molestie, ut maximus nisi vestibulum. 
        Vivamus ac ultricies mauris. Vestibulum luctus urna ligula, vel 
        finibus arcu aliquam vel. Sed ut leo gravida, facilisis eros ac, 
        fringilla odio. Nulla a purus sit amet tellus elementum dapibus.`,
		},
	];

	return (
		<div className="help-container_wrap">
			<Layout>
				<Layout.Section>
					<LegacyStack vertical alignment="center">
						<Text variant="heading2xl" fontWeight="medium" as="h1">
							Need help?
						</Text>
						<Text variant="bodyMd" as="p">
							You can read the list of questions and answers and solve your
							problem
						</Text>
					</LegacyStack>
				</Layout.Section>
				<Layout.Section>
					<div className="help-container-items_wrap">
						{questions.map(({ question, answer }, index) => (
							<HelpItem key={index} title={question} description={answer} />
						))}
					</div>
				</Layout.Section>
			</Layout>
		</div>
	);
}
