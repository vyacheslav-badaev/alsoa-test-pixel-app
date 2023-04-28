class EventsController {
	constructor() {}

	/**
	 * Listener new events from pixel extension to Alsoa API and update analytics counter
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} next
	 * @returns {Object} res
	 * */
	async addEvent(req, res, next) {
		try {
			return res.status(200).send({ message: 'Event added' });
		} catch (error) {
			console.error('addEvent Error', error.message);
			next(error);
		}
	}

	/**
	 * Return total count events for specific shop
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} next
	 * @returns {Object} res
	 * */
	async getEvents(req, res, next) {
		try {
			return res.status(200).send({ count: 0 });
		} catch (error) {
			console.error('addEvent Error', error.message);
			next(error);
		}
	}
}

export default new EventsController();
