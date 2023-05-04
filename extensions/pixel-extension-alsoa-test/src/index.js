import { register } from '@shopify/web-pixels-extension';


register(({ configuration, analytics, browser, settings, _pixelInfo }) => {
	// Bootstrap and insert pixel script tag here
	const BASE_URL = 'https://kansas-weekly-biodiversity-areas.trycloudflare.com';
	const endpointBase = `${BASE_URL}/api/events?id=${settings.accountID}`;
	// Sample subscribe to page view
	analytics.subscribe('all_standard_events', (event) => {
		console.log(event.name, event);
		browser.sendBeacon(endpointBase, JSON.stringify(event));
	});
});
