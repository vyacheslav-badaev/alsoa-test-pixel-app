import { register } from '@shopify/web-pixels-extension';

register(({ configuration, analytics, browser, settings, _pixelInfo }) => {
	// Bootstrap and insert pixel script tag here
	const endpointBase = `https://forgotten-gdp-external-bronze.trycloudflare.com/api/events?id=${settings.accountID}`;
	// Sample subscribe to page view
	analytics.subscribe('page_viewed', (event) => {
		console.log('Page viewed2', event);
		browser.sendBeacon(endpointBase, JSON.stringify(event));
	});
});
