import 'dotenv/config';
import { BillingInterval, LATEST_API_VERSION } from '@shopify/shopify-api';
import { shopifyApp } from '@shopify/shopify-app-express';
import { RedisSessionStorage } from '@shopify/shopify-app-session-storage-redis';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04';

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
	'My Shopify One-Time Charge': {
		// This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
		amount: 5.0,
		currencyCode: 'USD',
		interval: BillingInterval.OneTime,
	},
};

const shopify = shopifyApp({
	api: {
		apiVersion: LATEST_API_VERSION,
		restResources,
		billing: undefined, // or replace with billingConfig above to enable example billing
	},
	auth: {
		path: '/api/auth',
		callbackPath: '/api/auth/callback',
	},
	webhooks: {
		path: '/api/webhooks',
	},
	// This should be replaced with your preferred storage strategy
	sessionStorage: new RedisSessionStorage(process.env.REDIS_URL),
});

/**
 * @typedef FetchShopifyShopDataReturn
 * @property {string} myshopifyDomain Shop domain.
 * @property {string} email Shop email.
 * @property {string} name Shop name.
 * @property {string} id Shopify Shop graphql id.
 */

/**
 * Fetch shop data from Shopify
 * @param session
 * @return {Promise<FetchShopifyShopDataReturn>}
 */
export const fetchShop = async (session) => {
	try {
		const GET_SHOP = `
		{
			shop {
				id
				name
				email
				myshopifyDomain
			}
		}
	`;

		const client = new shopify.api.clients.Graphql({
			session,
		});

		const { body: resBody } = await client.query({
			data: GET_SHOP,
		});

		if (resBody?.errors) {
			throw new Error(resBody.errors[0].message);
		}

		return resBody?.data?.shop;
	} catch (e) {
		console.error('Error response', e?.response?.errors);
		console.error('Error message', e.message);
		throw new Error(e.message);
	}
};

/**
 * register pixel extension
 * @param session
 * @return {Promise<object>}
 */
export const pixelExtensionActivate = async (session) => {
	try {
		const settingID = Buffer.from(session.shop).toString('base64');
		const WEB_PIXEL_EXTENSION_ACTIVATE = `
		mutation {
      webPixelCreate(
				webPixel: { settings: "{\\"accountID\\":\\"${settingID}\\"}" }
      ) {
        userErrors {
          code
          field
          message
        }
        webPixel {
          settings
          id
        }
      }
    }`;

		const client = new shopify.api.clients.Graphql({
			session,
		});

		const res = await client.query({
			data: {
				query: WEB_PIXEL_EXTENSION_ACTIVATE,
			},
		});

		const { body: resBody } = res;

		if (resBody?.errors) {
			console.log(resBody.errors[0].message);
			throw new Error(resBody.errors[0].message);
		}
		if (resBody?.data?.webPixelCreate?.userErrors?.length) {
			console.log(resBody.data.webPixelCreate.userErrors);
			throw new Error(resBody.data.webPixelCreate.userErrors);
		}

		return resBody?.data?.webPixelCreate;
	} catch (e) {
		// console.error('Error response', e?.response?.errors);
		// console.error('Error message', e?.message);
		console.log(e);
		throw new Error(e);
	}
};

/**
 * register pixel extension
 * @param session
 * @param {string} id
 * @return {Promise<object>}
 */
export const pixelExtensionDeactivate = async (session, id) => {
	try {
		const WEB_PIXEL_EXTENSION_ACTIVATE = `
		mutation {
      webPixelDelete(id: "${id}") {
        userErrors {
          code
          field
          message
        }
      }
    }`;

		const client = new shopify.api.clients.Graphql({
			session,
		});

		const res = await client.query({
			data: {
				query: WEB_PIXEL_EXTENSION_ACTIVATE,
			},
		});

		const { body: resBody } = res;

		if (resBody?.errors) {
			console.log(resBody.errors[0].message);
			throw new Error(resBody.errors[0].message);
		}
		if (resBody?.data?.webPixelDelete?.userErrors?.length) {
			console.log(resBody.data.webPixelDelete.userErrors);
			throw new Error(resBody.data.webPixelDelete.userErrors);
		}

		return resBody?.data;
	} catch (e) {
		// console.error('Error response', e?.response?.errors);
		// console.error('Error message', e?.message);
		throw new Error(e.message);
	}
};

export default shopify;
