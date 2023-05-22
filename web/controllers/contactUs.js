class ContactUsController {
	constructor() {}

	async contactUs(req, res, next) {
		try {
			console.log('Contact us');

			

			res.sendStatus(200);
		} catch (error) {
			console.error('contactUs Error', error.message);
			next(error);
		}
	}
}

export default new ContactUsController();
