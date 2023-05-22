import nodemailer from 'nodemailer';

class EmailService {
	async sendEmail(fullName, email, topic, text) {
		const testAccount = await nodemailer.createTestAccount();

		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false,
			auth: { user: testAccount.user, pass: testAccount.pass },
		});

		await transporter.sendMail({
			from: `"${fullName}" <${email}>`,
			to: 'veronika.romanenko@devit.group',
			subject: topic,
			text: text,
			html: `<p>${text}</p>`,
		});
	}
}

export default new EmailService();
