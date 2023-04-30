import axios from 'axios';

class AlsoaService {
	constructor() {
		this.client = axios.create({
			baseURL: 'https://api.alsoa.com/api',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	/**
	 * Send event to Alsoa API
	 * @param event
	 * @return {Promise<boolean>}
	 */
	async sendEvent(event) {
		try {
			const data = await this.client.post(`/events`, event);
			return data.status === 200;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default new AlsoaService();
