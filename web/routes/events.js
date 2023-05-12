import EventsController from '../controllers/events.js';

export default (router) => {
	router.get('/events/count', EventsController.getEvents);
};
