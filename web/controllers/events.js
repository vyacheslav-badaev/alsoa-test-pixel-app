import { AlsoaEvents } from '../constants/alsoaEvents.js';
import AlsoaService from '../services/alsoa.js';
import ShopsStorage from '../services/shopsStorage.js';

class EventsController {
	constructor() {}

	/**
	 * Listener new events from pixel extension to Alsoa API and update analytics counter
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} next
	 * @returns {Object} res
	 * */
	async addEvent(req, res, next) {
		try {
			//TODO for production I recommend to use queue for handle events(SQS, RabbitMQ, etc.)
			const { id: accountID } = req.query;
			const eventData = JSON.parse(req.body);
			const { event, ttclid, fbclid } = eventData;
			const shop = Buffer.from(accountID, 'base64').toString('ascii');
			const shopData = await ShopsStorage.getShopByDomain(shop);

			console.log(event.name);

			if (!shopData || !shopData.tiktokPixelId || !shopData.tiktokAccessToken) {
				throw new Error('Shop does not have tiktok pixel id or token');
			}

			if (!ttclid && !fbclid) {
				throw new Error('No clids');
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

			console.log('alsoaEventData', alsoaEventData);

			if (ttclid) {
				const result = await AlsoaService.sendEvent({
					...alsoaEventData,
					pixel_id: shopData.tiktokPixelId,
					token: shopData.tiktokAccessToken,
					ttclid,
				});
				result && (await ShopsStorage.increaseShopCounter(shop));
			}

			if (fbclid) {
				const result = await AlsoaService.sendEvent({
					...alsoaEventData,
					pixel_id: shopData.facebookPixelId,
					token: shopData.facebookAccessToken,
					fbclid,
				});
				result && (await ShopsStorage.increaseShopCounter(shop));
			}

			return res.status(200).send({ message: 'Event added' });
		} catch (error) {
			// console.error('addEvent Error', error.message);
			next(error);
		}
	}

	/**
	 * Return total count events for specific shop
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} next
	 * @returns {Object} res
	 * */
	async getEvents(req, res, next) {
		try {
			const { shop } = res.locals.shopify.session;
			const shopData = await ShopsStorage.getShopByDomain(shop);
			return res.status(200).send({ count: shopData.eventsCount });
		} catch (error) {
			console.error('addEvent Error', error.message);
			next(error);
		}
	}
}

export default new EventsController();
