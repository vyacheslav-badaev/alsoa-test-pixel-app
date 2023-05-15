import shopRouter from './shop.js';
import eventsRouter from './events.js';
import contactUsRouter from './contactUs.js';

export default (router) => {
	shopRouter(router);
	eventsRouter(router);
	contactUsRouter(router);
	return router;
};
