import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { Frame } from '@shopify/polaris';
import './assets/style.css'

import { AppBridgeProvider, QueryProvider, PolarisProvider } from './components';

export default function App() {
	// Any .tsx or .jsx files in /pages will become a route
	// See documentation for <Routes /> for more info
	const pages = import.meta.globEager('./pages/**/!(*.test.[jt]sx)*.([jt]sx)');

	return (
		<PolarisProvider>
			<BrowserRouter>
				<AppBridgeProvider>
					<QueryProvider>
						<Frame>
							<Routes pages={pages} />
						</Frame>
					</QueryProvider>
				</AppBridgeProvider>
			</BrowserRouter>
		</PolarisProvider>
	);
}
