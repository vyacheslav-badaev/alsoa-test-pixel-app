import { fetchShop } from '../services/shopify.js';

export const afterAuth = async (req, res, next) => {
	try {
		// TODO - save new store to db or update existing
		const session = res.locals.shopify.session;
		await fetchShop(session);
	} catch (e) {
		next(e);
	}
};
