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
			if (data.data?.results[0].response?.error_records) {
				console.log(
					'sendEventError',
					data.data?.results[0].response?.error_records
				);
			}
			// console.log('alsoaResult', data.data?.results[0].response?.error_records || data.data?.results);
			return data.status === 200;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default new AlsoaService();
