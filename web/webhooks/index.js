import GDPRWebhookHandlers from './gdpr.js';
import AppCore from './coreApp.js';

export default {
	...GDPRWebhookHandlers,
	...AppCore,
};
