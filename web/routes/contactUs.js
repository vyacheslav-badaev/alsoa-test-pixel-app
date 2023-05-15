import ContactUsController from '../controllers/contactUs.js';

export default (router) => {
	router.post('/contact-us', ContactUsController.contactUs);
};
