import Bull from 'bull';

class QueuesService {
	constructor() {
		this.queue = new Bull('events-queue', process.env.REDIS_URL);
	}

	async addToQueue(query, body) {
		await this.queue.add({ query, body });
	}
}

export default new QueuesService();
