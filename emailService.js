const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'thecoder780@gmail.com', 
    pass: process.env.Email_Pass, 
  },
});

const sendEmail = async (email,token) => {
  try {
    const info = await transporter.sendMail({
      from: '"Access Token" <thecoder780@gmail.com>', 
      to: email, 
      subject: 'This is a test email sent from Node.js', 
      text: `Hello`, 
      html: `<h3 style="color:red">This is your JWT Token please copy paste it on jwt.io website :</h3> <a href=${token}>${token}</a> `,
    });

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', );
  }
};

module.exports = {transporter,sendEmail};
