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
	 */

	/**
	 * Add new shop to database
	 *
	 * @param {AddShopInsertData} data
	 * @returns {Promise<Shop>}
	 *
	 */
	async addShop({ name, email, domain, accessToken, shopifyId, eventsCount }) {
		return await prisma.Shop.create({
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
	 * @returns {Promise<object>}
	 *
	 * */
	async getShopByDomain(domain) {
		return await prisma.Shop.findUnique({
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
		await prisma.Shop.update({
			where: {
				domain,
			},
			data: {
				eventsCount: {
					increment: 1,
				},
			},
		});
		return true;
	}

	/**
	 * Update shop data
	 * @param domain
	 * @param data
	 * @return {Promise<object>}
	 */
	async updateShop(domain, data) {
		return await prisma.Shop.update({
			where: {
				domain,
			},
			data,
		});
	}

	/**
	 * Delete shop by domain
	 * @param domain
	 * @return {Promise<object>}
	 */
	async deleteShop(domain) {
		return await prisma.Shop.delete({
			where: {
				domain,
			},
		});
	}
}

export default new ShopsStorageService();
