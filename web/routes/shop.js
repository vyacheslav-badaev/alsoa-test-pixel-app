import ShopsController from '../controllers/shops.js';

export default (router) => {
	router.get('/shop/profile', ShopsController.getShopProfile);
	router.put('/shop/profile', ShopsController.updateShopProfile);
	router.post('/shop/activate', ShopsController.activateApp);
	router.post('/shop/deactivate', ShopsController.deactivateApp);
};
