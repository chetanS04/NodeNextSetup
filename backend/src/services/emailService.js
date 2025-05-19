const transporter = require("./nodeMailer");
const prisma = require("../services/prismaClient");

const emailVerificationTemplate = require("../services/emailTemplate");

function generateRandomCode() {
  let token = "";
  for (let i = 0; i < 6; i++) {
    token += Math.floor(Math.random() * 10);
  }
  return token;
}

const sendEmailVerificationCode = async (user) => {
  const code = generateRandomCode();
  const username = user.username;

  await prisma.users.update({
    where: { email: user.email },
    data: { verification_code: code },
  });

  const mailOptions = {
    from: "topntechofficial@gmail.com",
    to: user.email,
    subject: "Email Verification Code",
    html: emailVerificationTemplate(code, username),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmailVerificationCode;