import nodemailer from "nodemailer";

export const sendMail = async (to: string, qrCodeUrl: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Your QR Code for entry",
    html: `<html><body>
    <h1>Your QR Code for entry is ready, scan it to enter</h1>
    </body></html>`,
    attachments: [
      {
        path: qrCodeUrl,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
