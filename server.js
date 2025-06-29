import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required' });

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "maksudor18@cse.pstu.ac.bd",
        pass: "oaas mkja ceuz tgur",
      },
    });

    await transporter.sendMail({
      from: `"MediCampus" <${"maksudor18@cse.pstu.ac.bd"}>`,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is ${otp}</h2>`,
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
