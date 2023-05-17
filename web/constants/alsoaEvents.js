export const EventTypes = {
	CHECKOUT_ADDRESS_INFO_SUBMITTED: 'checkout_address_info_submitted', // returns checkout
	CHECKOUT_COMPLETED: 'checkout_completed', // returns checkout
	CHECKOUT_CONTACT_INFO_SUBMITTED: 'checkout_contact_info_submitted', // returns checkout
	CHECKOUT_SHIPPING_INFO_SUBMITTED: 'checkout_shipping_info_submitted', // returns checkout
	CHECKOUT_STARTED: 'checkout_started', // returns checkout
	COLLECTION_VIEWED: 'collection_viewed', // returns collection
	PAGE_VIEWED: 'page_viewed', // not return data
	PAYMENT_INFO_SUBMITTED: 'payment_info_submitted', // returns checkout
	PRODUCT_ADDED_TO_CART: 'product_added_to_cart', // returns cartLine
	PRODUCT_VIEWED: 'product_viewed', // returns productVariant
	SEARCH_SUBMITTED: 'search_submitted', // return searchResult
};

export const AlsoaEvents = {
	[EventTypes.CHECKOUT_ADDRESS_INFO_SUBMITTED]: 'ViewContent',
	[EventTypes.CHECKOUT_COMPLETED]: 'Purchase',
	[EventTypes.CHECKOUT_CONTACT_INFO_SUBMITTED]: 'ViewContent',
	[EventTypes.CHECKOUT_SHIPPING_INFO_SUBMITTED]: 'ViewContent',
	[EventTypes.CHECKOUT_STARTED]: 'InitiateCheckout',
	[EventTypes.COLLECTION_VIEWED]: 'ViewContent',
	[EventTypes.PAGE_VIEWED]: 'ViewContent',
	[EventTypes.PAYMENT_INFO_SUBMITTED]: 'AddPaymentInfo',
	[EventTypes.PRODUCT_ADDED_TO_CART]: 'AddToCart',
	[EventTypes.PRODUCT_VIEWED]: 'ViewContent',
	[EventTypes.SEARCH_SUBMITTED]: 'Search',
};
