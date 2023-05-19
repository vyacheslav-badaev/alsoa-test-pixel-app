import { AlsoaEvents, EventTypes } from '../constants/alsoaEvents.js';

export default function getEventData(event, ip) {
	const data = {
		event: AlsoaEvents[event.name],
		time: event.timestamp,
		url: event.context.document.referrer,
		uas: event.context.navigator.userAgent,
		external_id: event.clientId,
		ip,
		content_name: event.context.document.title,
		// first_name: "" //TODO event "page_viewed" not provided by pixel extension  need custom solution
		// last_name: "" //TODO event "page_viewed" not provided by pixel extension need custom solution
	};

	if (
		[
			EventTypes.CHECKOUT_ADDRESS_INFO_SUBMITTED,
			EventTypes.CHECKOUT_COMPLETED,
			EventTypes.CHECKOUT_CONTACT_INFO_SUBMITTED,
			EventTypes.CHECKOUT_SHIPPING_INFO_SUBMITTED,
			EventTypes.CHECKOUT_STARTED,
			EventTypes.PAYMENT_INFO_SUBMITTED,
		].includes(event.name)
	) {
		data.email = event.data.checkout.email;
		data.country = event.data.checkout.shippingAddress?.country;
		data.city = event.data.checkout.shippingAddress?.city;
		data.state = event.data.checkout.shippingAddress?.province;
		data.postal = event.data.checkout.shippingAddress?.zip;
		data.mobile = event.data.checkout.phone;
		data.currency = event.data.checkout.currencyCode;
		data.value = event.data.checkout.subtotalPrice.amount;
	}

	if (event.name === EventTypes.PRODUCT_ADDED_TO_CART) {
		data.currency = event.data.cartLine.cost.totalAmount.currencyCode;
		data.content_name = event.data.cartLine.merchandise.product.title;
		data.value = event.data.cartLine.cost.totalAmount.amount;
		data.content_category = event.data.cartLine.merchandise.product.type;
	}

	if (event.name === EventTypes.PRODUCT_VIEWED) {
		data.currency = event.data.productVariant.price.currencyCode;
		data.content_name = event.data.productVariant.product.title;
		data.content_category = event.data.productVariant.product.type;
	}

	if (event.name === EventTypes.COLLECTION_VIEWED) {
		data.content_name = event.data.collection.title;
	}

	return data;
}
