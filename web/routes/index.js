import shopRouter from './shop.js';
import eventsRouter from './events.js';

export default (router) => {
	shopRouter(router);
	eventsRouter(router);
	return router;
};
