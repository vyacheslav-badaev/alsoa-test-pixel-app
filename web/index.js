// @ts-check
import 'dotenv/config';
import { join } from 'path';
import { readFileSync } from 'fs';
import express from 'express';
import serveStatic from 'serve-static';
import EventsController from './controllers/events.js';
import shopify from './services/shopify.js';
import AppWebhooks from './webhooks/index.js';
import { afterAuth } from './middlewares/afterAuth.js';
import routes from './routes/index.js';
import cors from 'cors';

const router = express.Router();

const PORT = parseInt(
	process.env.BACKEND_PORT || process.env.PORT || '3000',
	10
);

const STATIC_PATH =
	process.env.NODE_ENV === 'production'
		? `${process.cwd()}/frontend/dist`
		: `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
	shopify.config.auth.callbackPath,
	shopify.auth.callback(),
	afterAuth(),
	shopify.redirectToShopifyOrAppRoot()
);

app.post(
	shopify.config.webhooks.path,
	shopify.processWebhooks({
		webhookHandlers: AppWebhooks,
	})
);
// Route for pixel extension requests
app.post(
	'/api/events',
	express.text({ type: '*/*', limit: '2mb' }),
	cors(),
	EventsController.addEvent
);

app.use('/api/*', shopify.validateAuthenticatedSession());

app.use(express.json());

app.use('/api', routes(router));

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use('/*', shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
	return res
		.status(200)
		.set('Content-Type', 'text/html')
		.send(readFileSync(join(STATIC_PATH, 'index.html')));
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Server error!', err.message);
});

app.listen(PORT, () => {
	console.log(`<<<Server running on port ${PORT}>>>`);
});
