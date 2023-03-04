const nodemailer = require('../config/nodemailer');
   

//this is the another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside new comment mailer');

    let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: "tarway2003@gmail.com",
        to: comment.user.email,
        subject: "New Content Published",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log("Error in sending mail ", err);
            return;
        }
        
        console.log("Message sent ", info);
        return;
    });
}
