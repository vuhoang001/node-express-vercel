const nodemailer = require("nodemailer");

const sendMail = (email, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vuhoang250203@gmail.com",
      pass: "byqu chlg rsqj xshg",
    },
  });

  const mailOptions = {
    from: "vuhoang250203@gmail.com",
    to: email,
    subject: "Mã OTP xác minh lấy lại mật khẩu!",
    html: link,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendMail };
