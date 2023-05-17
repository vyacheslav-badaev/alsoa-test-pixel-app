import AlsoaService from '../services/alsoa.js';
import ShopsStorage from '../services/shopsStorage.js';
import getEventData from './getEventData.js';

export default async function handleEvent(query, body, ip) {
	const { id: accountID } = query;
	const eventData = JSON.parse(body);
	const { event, ttclid, fbclid, sclid, epik } = eventData;
	const shop = Buffer.from(accountID, 'base64').toString('ascii');
	const shopData = await ShopsStorage.getShopByDomain(shop);

	console.log(event.name);

	if (!shopData) {
		throw new Error('Shop does not have tiktok pixel id or token');
	}

	const alsoaEventData = getEventData(event, ip);

	if (ttclid && shopData.tiktokPixelId && shopData.tiktokAccessToken) {
		await AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.tiktokPixelId,
			token: shopData.tiktokAccessToken,
			ttclid,
		});
	}

	if (fbclid && shopData.facebookPixelId && shopData.facebookAccessToken) {
		await AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.facebookPixelId,
			token: shopData.facebookAccessToken,
			fbclid,
		});
	}

	if (sclid && shopData.snapchatPixelId && shopData.snapchatAccessToken) {
		await AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.snapchatPixelId,
			token: shopData.snapchatAccessToken,
			sclid,
		});
	}

	if (epik && shopData.pinterestApiKey && shopData.pinterestAccessToken) {
		await AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.pinterestApiKey,
			token: shopData.pinterestAccessToken,
			epik,
		});
	}
}
