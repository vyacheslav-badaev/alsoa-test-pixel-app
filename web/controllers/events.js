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
			const { event, ttclid } = eventData;
			const shop = Buffer.from(accountID, 'base64').toString('ascii');
			const shopData = await ShopsStorage.getShopByDomain(shop);

			if (!shopData || !shopData.tiktokPixelId || !shopData.tiktokAccessToken) {
				throw new Error('Shop does not have tiktok pixel id or token');
			}

			if (!ttclid) {
				throw new Error('No clids');
			}

			const alsoaEventData = {
				pixel_id: shopData.tiktokPixelId,
				token: shopData.tiktokAccessToken,
				ttclid: eventData.ttclid,
				time: event.timestamp,
				url: event.context.document.referrer,
				uas: event.context.navigator.userAgent,
				content_name: event.context.document.title,
				external_id: event.clientId,
				event: AlsoaEvents[event.name],
				// first_name: "" //TODO event "page_viewed" not provided by pixel extension  need custom solution
				// last_name: "" //TODO event "page_viewed" not provided by pixel extension need custom solution
				// email: "" //TODO event "page_viewed" not provided by pixel extension need custom solution
				// etc like ip, mobil, country, zip... //TODO event "page_viewed" not provided by pixel extension need custom solution
			};

			const result = await AlsoaService.sendEvent(alsoaEventData);
			result && (await ShopsStorage.increaseShopCounter(shop));

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
