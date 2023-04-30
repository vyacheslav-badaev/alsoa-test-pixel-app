import ShopsStorage from '../services/shopsStorage.js';
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
}

export default new ShopsController();
