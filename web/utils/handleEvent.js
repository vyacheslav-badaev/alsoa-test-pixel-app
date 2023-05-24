import AlsoaService from '../services/alsoa.js';
import ShopsStorage from '../services/shopsStorage.js';
import getEventData from './getEventData.js';

export default async function handleEvent(query, body, ip) {
	const { id: accountID } = query;
	const eventData = JSON.parse(body);
	const { event, ttclid, fbclid, sclid, epik } = eventData;
	const shop = Buffer.from(accountID, 'base64').toString('ascii');
	const shopData = await ShopsStorage.getShopByDomain(shop);
	const alsoaRequests = [];

	console.log(shop, event.name);

	if (!shopData) {
		throw new Error('Shop does not have tiktok pixel id or token');
	}

	const alsoaEventData = getEventData(event, ip);

	if (ttclid && shopData.tiktokPixelId && shopData.tiktokAccessToken) {
		const pendingResult =  AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.tiktokPixelId,
			token: shopData.tiktokAccessToken,
			ttclid,
		});
		alsoaRequests.push(pendingResult);
	}

	if (fbclid && shopData.facebookPixelId && shopData.facebookAccessToken) {
		const pendingResult = AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.facebookPixelId,
			token: shopData.facebookAccessToken,
			fbclid,
		});
		alsoaRequests.push(pendingResult);
	}

	if (sclid && shopData.snapchatPixelId && shopData.snapchatAccessToken) {
		const pendingResult = AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.snapchatPixelId,
			token: shopData.snapchatAccessToken,
			sclid,
		});
		alsoaRequests.push(pendingResult);
	}

	if (epik && shopData.pinterestApiKey && shopData.pinterestAccessToken) {
		const pendingResult = AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.pinterestApiKey,
			token: shopData.pinterestAccessToken,
			epik,
		});
		alsoaRequests.push(pendingResult);
	}

	// Send all requests in parallel
	alsoaRequests.length && await Promise.allSettled(alsoaRequests).catch((e) => {
		console.error('Error sending events to alsoa', e);
	});
}
