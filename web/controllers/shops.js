import ShopsStorage from '../services/shopsStorage.js';
import {
	pixelExtensionActivate,
	pixelExtensionDeactivate,
} from '../services/shopify.js';

class ShopsController {
	/**
	 * Get shop profile
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} next
	 * @returns {Object} res
	 * */
	async getShopProfile(req, res, next) {
		try {
			const session = res.locals.shopify.session;
			const shop = await ShopsStorage.getShopByDomain(session.shop);
			if (!shop) {
				return res.status(404).send({ message: 'Shop not found' });
			}
			return res.status(200).send({ shop });
		} catch (e) {
			console.error('getShopProfile Error', e.message);
			next(e);
		}
	}

	/**
	 * Update shop profile
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} next
	 * @returns {Object} res
	 * */
	async updateShopProfile(req, res, next) {
		try {
			const session = res.locals.shopify.session;
			const shop = await ShopsStorage.updateShop(session.shop, req.body);
			if (!shop) {
				return res.status(404).send({ message: 'Shop not found' });
			}
			return res.status(200).send({ shop });
		} catch (e) {
			console.error('updateShopProfile Error', e.message);
			next(e);
		}
	}

	/**
	 * Activate app
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} next
	 * @returns {Object} res
	 * */
	async activateApp(req, res, next) {
		try {
			const session = res.locals.shopify.session;

			const res = await pixelExtensionActivate(session);

			return res.sendStatus(200);
		} catch (e) {
			console.error('updateShopProfile Error', e.message);
			next(e);
		}
	}

	/**
	 * Deactivate app
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} next
	 * @returns {Object} res
	 * */
	async deactivateApp(req, res, next) {
		try {
			const session = res.locals.shopify.session;

			const res = await pixelExtensionDeactivate(session);

			return res.sendStatus(200);
		} catch (e) {
			console.error('updateShopProfile Error', e.message);
			next(e);
		}
	}
}

export default new ShopsController();
