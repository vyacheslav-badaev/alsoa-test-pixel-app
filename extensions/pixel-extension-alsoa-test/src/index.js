import { register } from '@shopify/web-pixels-extension';

function setParamInCookie(browser, params, name) {
	const index = params.findIndex((v) => v.includes(`${name}=`));
	if (index != -1) {
		const value = params[index].split(`${name}=`).pop();
		browser.cookie.set(`${name}=${value}; Path=/`);
	}
}

register(({ configuration, analytics, browser, settings, _pixelInfo }) => {
	// Bootstrap and insert pixel script tag here
	const BASE_URL =
		'https://rebel-findarticles-referred-edited.trycloudflare.com';
	const endpointBase = `${BASE_URL}/api/events?id=${settings.accountID}`;
	analytics.subscribe('all_standard_events', async (event) => {
		console.log(event.name, event);

		const search = event.context.document.location.search;
		if (search) {
			const params = search.slice(1).split('&');

			setParamInCookie(browser, params, 'ttclid');
			setParamInCookie(browser, params, 'fbclid');
			setParamInCookie(browser, params, 'sclid');
			setParamInCookie(browser, params, 'epik');
		}

		if (
			event.name === 'page_viewed' &&
			(/^\/products\/\S+/.test(event.context.document.location.pathname) ||
				(/^\/collections\/\S+/.test(event.context.document.location.pathname) &&
					!event.context.document.location.pathname.includes(
						'/collections/all'
					)))
		) {
			return;
		}

		const ttclidFromCookie = await browser.cookie.get('ttclid');
		const fbclidFromCookie = await browser.cookie.get('fbclid');
		const sclidFromCookie = await browser.cookie.get('sclid');
		const epikFromCookie = await browser.cookie.get('epik');
		if (ttclidFromCookie || fbclidFromCookie || sclidFromCookie) {
			browser.sendBeacon(
				endpointBase,
				JSON.stringify({
					event,
					ttclid: ttclidFromCookie,
					fbclid: fbclidFromCookie,
					sclid: sclidFromCookie,
					epik: epikFromCookie,
				})
			);
		}
	});
});
