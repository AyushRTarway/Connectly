const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "tarway2003@gmail.com",
    pass: "jgqjhekgsirwblog",
  },
});

let renderTemplate = (data, relativepath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer', relativepath),
        data,
        function (err, template) {
            if (err) {
                console.log("Error in rendering the template");
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate:renderTemplate
}