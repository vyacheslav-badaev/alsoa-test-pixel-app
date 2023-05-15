import { TitleBar } from '@shopify/app-bridge-react';
import {
	AlphaCard,
	Layout,
	SkeletonBodyText,
	SkeletonPage,
} from '@shopify/polaris';

export function DashboardSkeleton() {
	return (
		<SkeletonPage narrowWidth>
			<TitleBar title="Shopify Pixel Alsoa" primaryAction={null} />
			<Layout>
				{[...Array(5)].map((x, i) => (
					<Layout.Section key={i}>
						<AlphaCard>
							<SkeletonBodyText />
						</AlphaCard>
					</Layout.Section>
				))}
			</Layout>
		</SkeletonPage>
	);
}
