import { fetchShop, pixelExtensionActivate } from '../services/shopify.js';
import ShopsStorageService from '../services/shopsStorage.js';

/**
 * After auth middleware. Store shop data to our db.
 *
 * @return {(function(*, *, *): Promise<void>)|*}
 */
export const afterAuth = () => async (req, res, next) => {
	try {
		const session = res.locals.shopify.session;
		const shopifyShopData = await fetchShop(session);

		if (!shopifyShopData) {
			throw new Error('Fetch shopifyShopData failed');
		}

		const shop = await ShopsStorageService.getShopByDomain(shopifyShopData.myshopifyDomain);

		if (!shop) {
			await ShopsStorageService.addShop({
				domain: shopifyShopData.myshopifyDomain,
				name: shopifyShopData.name,
				email: shopifyShopData.email,
				shopifyId: shopifyShopData.id,
				accessToken: session.accessToken,
				eventsCount: 0,
			});
		}

		if (shop) {
			await ShopsStorageService.updateShop(shopifyShopData.myshopifyDomain, {
				name: shopifyShopData.name,
				email: shopifyShopData.email,
				shopifyId: shopifyShopData.id,
				accessToken: session.accessToken,
			});
		}

		await pixelExtensionActivate(session);

		next();
	} catch (e) {
		next(e);
	}
};
