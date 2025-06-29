const nodemailer = require("nodemailer");
const { pool } = require("../config/connectDb");
const { isValidEmail } = require("../lib");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const postMessage = async (req: any, res: any) => {
  const { name, email, message } = req.body;

  try {
    if (!isValidEmail(email)) {
      return res.status(500).json({ message: "Email is not valid" });
    }
    if (!name || !email || !message) {
      return res.status(500).json({ message: "All fields are required" });
    }

    const response = await pool.query(
      "insert into portfolio (name, email, message) values ($1, $2, $3)",
      [name, email, message]
    );
    res.status(200).json({ message: "Message sent successfully" });

    const sub = name.toUpperCase() + " -  Message from your Portfolio";
    console.log("sub", sub);

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: sub,

      html: `<!DOCTYPE html>
          <html>
            <body>
              <h1>${message} </h1>
            </body>
          </html>`,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = { postMessage };
