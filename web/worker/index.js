import Bull from 'bull';
import handleEvent from '../utils/handleEvent.js';

const queue = new Bull('events-queue', process.env.REDIS_URL);

const start = async () => {
	try {
		queue.process((job, done) => {
			console.log('Process job -> ' + job.id);
			handleEvent(job.data.query, job.data.body)
				.then(() => {
					console.log('Done job -> ' + job.id);
					done(null, true);
				})
				.catch((e) => {
					console.log('Error -> ' + job.id, e);
					done(e, null);
				});
		});
	} catch (err) {
		console.log(err);
	}
};
start();
