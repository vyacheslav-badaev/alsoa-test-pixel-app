// @ts-check
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ShopsStorageService {
	/**
	 * @typedef AddShopInsertData
	 * @property {number} eventsCount Count Alsoa requests.
	 * @property {string} domain Shop domain.
	 * @property {string} email Shop email.
	 * @property {string} name Shop name.
	 * @property {string} shopifyId Shopify Shop graphql id.
	 * @property {string} accessToken
	 */

	/**
	 * Add new shop to database
	 *
	 * @param {AddShopInsertData} data
	 * @returns {Promise<import('@prisma/client').Shop>}
	 *
	 */
	async addShop({ name, email, domain, accessToken, shopifyId, eventsCount }) {
		return await prisma.shop.create({
			data: {
				name,
				email,
				domain,
				accessToken,
				shopifyId,
				eventsCount,
			},
		});
	}

	/**
	 * Get shop by domain
	 *
	 * @param {String} domain
	 * @returns {Promise<import('@prisma/client').Shop | null>}
	 *
	 * */
	async getShopByDomain(domain) {
		return await prisma.shop.findUnique({
			where: {
				domain,
			},
		});
	}

	/**
	 * Increase events counter for specific shop
	 * @param {String} domain
	 * @return {Promise<boolean>}
	 */
	async increaseShopCounter(domain) {
		try {
			await prisma.shop.update({
				where: {
					domain,
				},
				data: {
					eventsCount: {
						increment: 1,
					},
				},
			});
		} catch (err) {
			console.log('increaseShopCounterErr', err);
		}
		return true;
	}

	/**
	 * Update shop data
	 * @param {String} domain
	 * @param data
	 * @return {Promise<object>}
	 */
	async updateShop(domain, data) {
		return await prisma.shop.update({
			where: {
				domain,
			},
			data,
		});
	}

	/**
	 * Delete shop by domain
	 * @param {String} domain
	 * @return {Promise<object>}
	 */
	async deleteShop(domain) {
		return await prisma.shop.delete({
			where: {
				domain,
			},
		});
	}
}

export default new ShopsStorageService();
