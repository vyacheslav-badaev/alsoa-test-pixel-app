import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ShopsStorageService {
	/**
	 * Add new shop to database
	 *
	 * @param {Object} data
	 * @returns {Promise<Shop>}
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
	 * @returns {Promise<Shop>}
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
	 * @param domain
	 * @return {Promise<*>}
	 */
	async increaseShopCounter(domain) {
		await prisma.shop.update(
			{
				where: {
					domain,
				},
			},
			{
				data: {
					eventsCount: {
						increment: 1,
					},
				},
			}
		);
		return true;
	}

	/**
	 * Update shop data
	 * @param domain
	 * @param data
	 * @return {Promise<*>}
	 */
	async updateShop(domain, data) {
		return await prisma.shop.update({
			where: {
				domain,
			},
			data,
		});
	}
}

export default new ShopsStorageService();
