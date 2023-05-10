import { register } from '@shopify/web-pixels-extension';

register(({ configuration, analytics, browser, settings, _pixelInfo }) => {
	// Bootstrap and insert pixel script tag here
	const BASE_URL =
		'https://hugh-secretariat-proprietary-fishing.trycloudflare.com';
	const endpointBase = `${BASE_URL}/api/events?id=${settings.accountID}`;
	// Sample subscribe to page view
	analytics.subscribe('all_standard_events', async (event) => {
		console.log(event.name, event);
		const search = event.context?.document?.location?.search;
		if (search && typeof search === 'string') {
			const params = search.slice(1).split('&');
			const ttclidId = params.findIndex((v) => v.includes('ttclid='));
			if (ttclidId != -1) {
				const ttclid = params[ttclidId].split('ttclid=').pop();
				browser.cookie.set(`ttclid=${ttclid}; Path=/`);
			}
		}

		const ttclidFromCookie = await browser.cookie.get('ttclid');
		browser.sendBeacon(
			endpointBase,
			JSON.stringify({ event, ttclid: ttclidFromCookie })
		);
	});
});
