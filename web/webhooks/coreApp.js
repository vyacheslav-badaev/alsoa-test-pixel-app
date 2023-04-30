import { DeliveryMethod } from '@shopify/shopify-api';
import ShopsStorageService from '../services/shopsStorage.js';

export default {
	/**
	 * Occurs whenever a shop has uninstalled the app.
	 * Shopify invokes this webhook.
	 *
	 * https://shopify.dev/docs/api/admin-graphql/2023-04/enums/WebhookSubscriptionTopic#value-appuninstalled
	 */
	APP_UNINSTALLED: {
		deliveryMethod: DeliveryMethod.Http,
		callbackUrl: '/api/webhooks',
		callback: async (topic, shop, body, webhookId) => {
			console.log('APP_UNINSTALLED', shop, webhookId);
			await ShopsStorageService.deleteShop(shop);
		},
	},
};
