import Bull from 'bull';

class QueuesService {
	constructor() {
		this.queue = new Bull('events-queue', process.env.REDIS_URL);
	}

	async addToQueue(query, body, ip) {
		await this.queue.add({ query, body, ip });
	}
}

export default new QueuesService();
