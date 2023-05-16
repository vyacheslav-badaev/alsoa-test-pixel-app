import { AlsoaEvents } from '../constants/alsoaEvents.js';
import AlsoaService from '../services/alsoa.js';
import ShopsStorage from '../services/shopsStorage.js';

export default async function handleEvent(query, body) {
	const { id: accountID } = query;
	const eventData = JSON.parse(body);
	const { event, ttclid, fbclid, sclid, epik } = eventData;
	const shop = Buffer.from(accountID, 'base64').toString('ascii');
	const shopData = await ShopsStorage.getShopByDomain(shop);

	console.log(event.name);

	if (!shopData) {
		throw new Error('Shop does not have tiktok pixel id or token');
	}

	const alsoaEventData = {
		event: AlsoaEvents[event.name],
		// first_name: "" //TODO event "page_viewed" not provided by pixel extension  need custom solution
		// last_name: "" //TODO event "page_viewed" not provided by pixel extension need custom solution
		email: event.data?.checkout?.email,
		country: event.data?.checkout?.shippingAddress?.country,
		city: event.data?.checkout?.shippingAddress?.city,
		state: event.data?.checkout?.shippingAddress?.province,
		postal: event.data?.checkout?.shippingAddress?.zip,
		mobile: event.data?.checkout?.phone,
		time: event.timestamp,
		url: event.context.document.referrer,
		// ip,
		uas: event.context.navigator.userAgent,
		external_id: event.clientId,
		currency:
			event.data?.checkout?.currencyCode ||
			event.data?.cartLine?.cost?.totalAmount?.currencyCode ||
			event.data?.productVariant?.price?.currencyCode,
		// value,
		// content_category,
		content_name: event.context.document.title,
		// etc like ip, mobil, country, zip... //TODO event "page_viewed" not provided by pixel extension need custom solution
	};

	if (ttclid && shopData.tiktokPixelId && shopData.tiktokAccessToken) {
		const result = await AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.tiktokPixelId,
			token: shopData.tiktokAccessToken,
			ttclid,
		});
		result && (await ShopsStorage.increaseShopCounter(shop));
	}

	if (fbclid && shopData.facebookPixelId && shopData.facebookAccessToken) {
		const result = await AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.facebookPixelId,
			token: shopData.facebookAccessToken,
			fbclid,
		});
		result && (await ShopsStorage.increaseShopCounter(shop));
	}

	if (sclid && shopData.snapchatPixelId && shopData.snapchatAccessToken) {
		const result = await AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.snapchatPixelId,
			token: shopData.snapchatAccessToken,
			sclid,
		});
		result && (await ShopsStorage.increaseShopCounter(shop));
	}

	if (epik && shopData.pinterestApiKey && shopData.pinterestAccessToken) {
		const result = await AlsoaService.sendEvent({
			...alsoaEventData,
			pixel_id: shopData.pinterestApiKey,
			token: shopData.pinterestAccessToken,
			epik,
		});
		result && (await ShopsStorage.increaseShopCounter(shop));
	}
}
