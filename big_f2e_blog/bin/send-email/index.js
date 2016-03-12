var nodemailer = require("nodemailer");

module.exports = function(to,subject,content,callback) {

	var transport = nodemailer.createTransport("SMTP", {
		host: "smtp.126.com",
		secureConnection: true, // use SSL
		port: 465, // port for secure SMTP
		auth: {
			user: "live_web@126.com",
			pass: "449422301"
		}
	});

	transport.sendMail({
		from: "live_web@126.com",
		to: to,
		subject: subject,
		generateTextFromHTML: true,
		html: content
	}, function(error, response) {
		if (error) {
			callback(error);
		} else {
			callback("恭喜您内！邮件发送成功!" );
		}
		transport.close();
	});

}
	